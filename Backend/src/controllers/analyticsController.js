const mongoose = require("mongoose");
const ContributionLog = require("../models/contributionLog");
const Issue = require("../models/issue");
const Project = require("../models/project");
const TeamMember = require("../models/teamMember");
const { handleRouteError } = require("../utils/handleRouteError");

async function getMemberActivity(req, res) {
  try {
    const { teamId } = req.params;
    const { since } = req.query;

    const match = { teamId: new mongoose.Types.ObjectId(teamId), endedAt: { $ne: null } };
    if (since) match.startedAt = { $gte: new Date(since) };

    const results = await ContributionLog.aggregate([
      { $match: match },
      { $group: { _id: '$userId', totalSeconds: { $sum: '$durationSeconds' }, sessionCount: { $sum: 1 } } },
      { $sort: { totalSeconds: -1 } },
      { $lookup: { from: 'Users', localField: '_id', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' },
      { $project: { userId: '$_id', name: { $concat: ['$user.firstName', ' ', '$user.lastName'] }, totalSeconds: 1, sessionCount: 1, _id: 0 } }
    ]);

    res.json({ results });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

async function getContributionTrend(req, res) {
  try {
    const { teamId } = req.params;
    const { userId, days = 30 } = req.query;
    const since = new Date(Date.now() - Number(days) * 24 * 60 * 60 * 1000);

    const match = {
      teamId: new mongoose.Types.ObjectId(teamId),
      endedAt: { $ne: null },
      startedAt: { $gte: since }
    };
    if (userId && userId !== 'all') match.userId = new mongoose.Types.ObjectId(userId);

    const results = await ContributionLog.aggregate([
      { $match: match },
      {
        $group: {
          _id: { day: { $dateToString: { format: '%Y-%m-%d', date: '$startedAt' } }, userId: '$userId' },
          totalSeconds: { $sum: '$durationSeconds' }
        }
      },
      { $sort: { '_id.day': 1 } }
    ]);

    res.json({ results });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

async function getCompletionRate(req, res) {
  try {
    const { teamId } = req.params;

    const results = await Issue.aggregate([
      { $match: { teamId: new mongoose.Types.ObjectId(teamId), assignedTo: { $ne: null }, archivedAt: null } },
      {
        $group: {
          _id: '$assignedTo',
          totalAssigned: { $sum: 1 },
          completed: { $sum: { $cond: [{ $eq: ['$status', 'done'] }, 1, 0] } }
        }
      },
      { $lookup: { from: 'Users', localField: '_id', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' },
      {
        $project: {
          userId: '$_id',
          name: { $concat: ['$user.firstName', ' ', '$user.lastName'] },
          totalAssigned: 1,
          completed: 1,
          completionRate: { $divide: ['$completed', '$totalAssigned'] },
          _id: 0
        }
      },
      { $sort: { completionRate: -1, totalAssigned: -1 } }
    ]);

    res.json({ results });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

async function getAssignmentSplit(req, res) {
  try {
    const { teamId } = req.params;

    const rawResults = await Issue.aggregate([
      { $match: { teamId: new mongoose.Types.ObjectId(teamId), assignedTo: { $ne: null }, archivedAt: null } },
      { $group: { _id: { userId: '$assignedTo', source: '$assignmentSource' }, count: { $sum: 1 } } },
      { $lookup: { from: 'Users', localField: '_id.userId', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' }
    ]);

    const memberMap = {};
    rawResults.forEach(item => {
      const userId = String(item._id.userId);
      if (!memberMap[userId]) {
        memberMap[userId] = {
          userId,
          name: `${item.user.firstName || ''} ${item.user.lastName || ''}`.trim(),
          self_claimed: 0,
          leader_assigned: 0,
          unassigned: 0
        };
      }
      const source = item._id.source || 'unassigned';
      if (source === 'self_claimed') memberMap[userId].self_claimed += item.count;
      else if (source === 'leader_assigned') memberMap[userId].leader_assigned += item.count;
      else memberMap[userId].unassigned += item.count;
    });

    const results = Object.values(memberMap);
    res.json({ results });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

async function getIdleMembers(req, res) {
  try {
    const { teamId } = req.params;
    const { days = 7 } = req.query;
    const since = new Date(Date.now() - Number(days) * 24 * 60 * 60 * 1000);

    const activeMembers = await TeamMember.find({ teamId, status: 'active' }).populate('userId', 'firstName lastName gmail photoUrl');

    const recentContributors = await ContributionLog.distinct('userId', {
      teamId,
      startedAt: { $gte: since }
    });
    const recentContributorIds = new Set(recentContributors.map(String));

    const idleRaw = activeMembers
      .filter(m => m.userId && !recentContributorIds.has(String(m.userId._id)))
      .map(m => ({
        userId: m.userId._id,
        name: `${m.userId.firstName || ''} ${m.userId.lastName || ''}`.trim(),
        email: m.userId.gmail,
        role: m.role
      }));

    const idleMembers = await Promise.all(idleRaw.map(async (member) => {
      const lastLog = await ContributionLog.findOne({ teamId, userId: member.userId })
        .sort({ startedAt: -1 })
        .select('startedAt');
      return {
        ...member,
        lastActive: lastLog ? lastLog.startedAt : null
      };
    }));

    res.json({ idleMembers, thresholdDays: Number(days) });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

async function getProjectBreakdown(req, res) {
  try {
    const { teamId } = req.params;

    const [byStatus, byPriority] = await Promise.all([
      Project.aggregate([
        { $match: { teamId: new mongoose.Types.ObjectId(teamId), archivedAt: null } },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      Project.aggregate([
        { $match: { teamId: new mongoose.Types.ObjectId(teamId), archivedAt: null } },
        { $group: { _id: '$priority', count: { $sum: 1 } } }
      ])
    ]);

    res.json({ byStatus, byPriority });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

module.exports = {
  getMemberActivity,
  getContributionTrend,
  getCompletionRate,
  getAssignmentSplit,
  getIdleMembers,
  getProjectBreakdown
};
