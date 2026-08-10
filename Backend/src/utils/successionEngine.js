const mongoose = require('mongoose');
const Issue = require('../models/issue');
const Goals = require('../models/goals');
const ContributionLog = require('../models/contributionLog');

const W1 = 2.0; // Issues closed
const W2 = 1.0; // Comments/Reviews (approx by chat messages if we had them, or general contributions)
const W3 = 3.0; // Goals completed
const W4 = 0.5; // Recency-weighted activity (hours of contribution in last 30 days)

/**
 * Calculates the contribution score for a user in a team.
 */
async function calculateScore(teamId, userId) {
    let score = 0;

    try {
        // 1. Issues Closed
        const issuesClosed = await Issue.countDocuments({ 
            teamId, 
            assignedTo: userId, 
            status: 'done' 
        });
        score += issuesClosed * W1;

        // 2. Goals Completed
        const goalsCompleted = await Goals.countDocuments({ 
            owner: userId, 
            status: 'completed' 
        });
        score += goalsCompleted * W3;

        // 3. Recency-weighted activity (last 30 days duration in hours)
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const activity = await ContributionLog.aggregate([
            { $match: { teamId: new mongoose.Types.ObjectId(teamId), userId: new mongoose.Types.ObjectId(userId), startedAt: { $gte: thirtyDaysAgo } } },
            { $group: { _id: null, totalSeconds: { $sum: '$durationSeconds' } } }
        ]);
        
        if (activity.length > 0 && activity[0].totalSeconds) {
            const hours = activity[0].totalSeconds / 3600;
            score += hours * W4;
        }

        // 4. Comments or Reviews (approximate using total ContributionLog sessions as a proxy for engagement)
        const sessions = await ContributionLog.countDocuments({ teamId, userId });
        score += sessions * W2;

    } catch (err) {
        console.error("Error calculating score for user", userId, err);
    }

    return score;
}

/**
 * Finds the best successor from a list of members.
 * @param {Array} members - Array of TeamMember documents
 * @returns {Object} The best successor TeamMember document
 */
async function getSuccessor(teamId, members) {
    if (!members || members.length === 0) return null;
    if (members.length === 1) return members[0]; // Lone member rule

    const scoredMembers = [];

    for (const member of members) {
        const score = await calculateScore(teamId, member.userId);
        scoredMembers.push({ member, score });
    }

    // Sort by score (DESC), then joinedAt (ASC - longest tenured), then userId (ASC - alphabetical deterministic)
    scoredMembers.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score;
        }
        
        const timeA = new Date(a.member.createdAt).getTime();
        const timeB = new Date(b.member.createdAt).getTime();
        if (timeA !== timeB) {
            return timeA - timeB;
        }

        const idA = String(a.member.userId);
        const idB = String(b.member.userId);
        return idA.localeCompare(idB);
    });

    return scoredMembers[0].member;
}

module.exports = {
    getSuccessor,
    calculateScore
};
