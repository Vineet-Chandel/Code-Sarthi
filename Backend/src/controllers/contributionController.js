const ContributionLog = require("../models/contributionLog");
const Issue = require("../models/issue");
const { handleRouteError } = require("../utils/handleRouteError");

async function startContribution(req, res) {
  try {
    const { teamId } = req.params;
    const { issueId } = req.body;

    const issue = await Issue.findOne({ _id: issueId, teamId, archivedAt: null });
    if (!issue) return res.status(404).json({ error: 'Issue not found or archived' });

    const existingActive = await ContributionLog.findOne({
      teamId,
      userId: req.user._id,
      endedAt: null
    });

    if (existingActive) {
      return res.status(409).json({
        error: 'You already have a running timer',
        activeContributionLogId: existingActive._id,
        activeIssueId: existingActive.issueId
      });
    }

    const log = await ContributionLog.create({
      teamId,
      projectId: issue.projectId,
      issueId,
      userId: req.user._id,
      startedAt: new Date()
    });

    await log.populate('issueId', 'title projectId status priority');

    res.status(201).json({ contributionLog: log });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

async function stopContribution(req, res) {
  try {
    const { teamId } = req.params;
    const { contributionLogId } = req.body;

    const log = await ContributionLog.findOne({
      _id: contributionLogId,
      teamId,
      userId: req.user._id,
      endedAt: null
    });
    if (!log) return res.status(404).json({ error: 'No matching running timer found' });

    const endedAt = new Date();
    const durationSeconds = Math.round((endedAt - log.startedAt) / 1000);

    log.endedAt = endedAt;
    log.durationSeconds = durationSeconds;
    await log.save();

    await log.populate('issueId', 'title projectId status priority');

    res.json({ contributionLog: log });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

async function getActiveContribution(req, res) {
  try {
    const { teamId } = req.params;
    const log = await ContributionLog.findOne({
      teamId,
      userId: req.user._id,
      endedAt: null
    }).populate('issueId', 'title projectId status priority');

    res.json({ contributionLog: log || null });
  } catch (err) {
    return handleRouteError(err, res);
  }
}

module.exports = {
  startContribution,
  stopContribution,
  getActiveContribution
};
