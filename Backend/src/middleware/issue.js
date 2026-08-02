const Issue = require('../models/issue');

async function requireIssueOwnerOrLeader(req, res, next) {
  try {
    const issue = await Issue.findById(req.params.issueId);
    if (!issue) return res.status(404).json({ error: 'Issue not found' });
    
    const isCreator = String(issue.createdBy) === String(req.user._id);
    const isLeader = req.membership.role === 'leader';
    const isAdmin = req.membership.role === 'admin';
    
    if (!isCreator && !isLeader && !isAdmin) {
      return res.status(403).json({ error: 'Only the creator, team leader, or admin can perform this action' });
    }
    
    req.issue = issue; // avoid a second lookup in the controller
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { requireIssueOwnerOrLeader };
