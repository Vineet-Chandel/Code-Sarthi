const mongoose = require('mongoose');
const Team = require('../models/team');
const TeamMember = require('../models/teamMember');
const Issue = require('../models/issue');
const Project = require('../models/project');
const TeamAuditLog = require('../models/teamAuditLog');
const EventOutbox = require('../models/eventOutbox');
const { getSuccessor } = require('../utils/successionEngine');

/**
 * Executes an atomic succession when a user leaves a team or deletes their account.
 * 
 * @param {String} teamId - The ID of the team
 * @param {String} departingUserId - The ID of the user leaving
 * @param {String} triggerEvent - 'ACCOUNT_DELETION' | 'VOLUNTARY_LEAVE'
 */
async function executeSuccession(teamId, departingUserId, triggerEvent) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const team = await Team.findById(teamId).session(session);
        if (!team) {
            await session.abortTransaction();
            session.endSession();
            return;
        }

        const departingMember = await TeamMember.findOne({ teamId, userId: departingUserId }).session(session);
        if (!departingMember) {
            // Already left or not part of team
            await session.abortTransaction();
            session.endSession();
            return;
        }

        const isOwner = String(team.ownerId) === String(departingUserId);
        const isAdmin = departingMember.role === 'admin' || departingMember.role === 'leader';
        let newOwnerId = null;

        if (isOwner) {
            // CASE A: Owner is leaving
            
            // 1. Find all remaining admins
            const remainingAdmins = await TeamMember.find({ 
                teamId, 
                userId: { $ne: departingUserId },
                role: { $in: ['admin', 'leader'] }
            }).session(session);

            let successorMember = await getSuccessor(teamId, remainingAdmins);

            // 2. If no admins exist, find remaining members
            if (!successorMember) {
                const remainingMembers = await TeamMember.find({ 
                    teamId, 
                    userId: { $ne: departingUserId }
                }).session(session);
                
                successorMember = await getSuccessor(teamId, remainingMembers);
            }

            if (successorMember) {
                // We have a successor!
                newOwnerId = successorMember.userId;

                // Promote successor to leader/owner
                successorMember.role = 'leader';
                await successorMember.save({ session });

                // Update team owner
                team.ownerId = successorMember.userId;
                await team.save({ session });

                // Write outbox event for notification
                await EventOutbox.create([{
                    type: 'SUCCESSION_NOTIFICATION',
                    payload: {
                        userId: successorMember.userId,
                        teamId: team._id,
                        teamName: team.name,
                        role: 'owner',
                        trigger: triggerEvent
                    }
                }], { session });

            } else {
                // Team is orphaned (0 members)
                team.status = 'archived'; // using archived as a soft-delete equivalent
                await team.save({ session });
            }

            // Write Audit Log
            await TeamAuditLog.create([{
                teamId: team._id,
                previousOwnerId: departingUserId,
                newOwnerId: newOwnerId, // Can be null if archived
                reason: 'AUTO_SUCCESSION',
                triggeredBy: triggerEvent
            }], { session });

        } else if (isAdmin) {
            // CASE B: Admin (non-owner) is leaving
            // Transfer their active responsibilities back to the Owner to avoid orphaned items.
            
            await Issue.updateMany(
                { teamId, assignedTo: departingUserId, status: { $ne: 'done' } },
                { $set: { assignedTo: team.ownerId, assignmentSource: 'leader_assigned' } },
                { session }
            );

            // Notify the owner about this automated fallback
            await EventOutbox.create([{
                type: 'ADMIN_FALLBACK_NOTIFICATION',
                payload: {
                    ownerId: team.ownerId,
                    adminId: departingUserId,
                    teamId: team._id,
                    teamName: team.name,
                    trigger: triggerEvent
                }
            }], { session });

            // Audit log for admin departure
            await TeamAuditLog.create([{
                teamId: team._id,
                previousOwnerId: departingUserId,
                newOwnerId: team.ownerId,
                reason: 'ADMIN_FALLBACK',
                triggeredBy: triggerEvent
            }], { session });
        }

        // Finally, remove or deactivate the departing user's TeamMember record & decrement count
        if (triggerEvent === 'VOLUNTARY_LEAVE') {
            departingMember.status = 'left';
            await departingMember.save({ session });
        } else {
            await TeamMember.deleteOne({ _id: departingMember._id }).session(session);
        }
        team.memberCount = Math.max(0, team.memberCount - 1);
        await team.save({ session });

        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        console.error("Succession Transaction Failed:", error);
        throw error;
    } finally {
        session.endSession();
    }
}

module.exports = {
    executeSuccession
};
