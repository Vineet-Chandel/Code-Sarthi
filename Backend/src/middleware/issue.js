const Issue = require('../models/issue');

async function requireIssueOwnerOrLeader(req, res, next) {
  try {
    const issue = await Issue.findById(req.params.issueId);
    if (!issue) return res.status(404).json({ error: 'Issue not found' });
    
    const isCreator = String(issue.createdBy) === String(req.user._id);
    const isLeader = req.membership.role === 'leader';
    
    if (!isCreator && !isLeader) {
      return res.status(403).json({ error: 'Only the creator or team leader can archive this issue' });
    }
    
    req.issue = issue; // avoid a second lookup in the controller
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { requireIssueOwnerOrLeader };
