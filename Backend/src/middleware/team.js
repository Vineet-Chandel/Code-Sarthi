const TeamMember = require('../models/teamMember');

async function requireTeamMembership(req, res, next) {
  try {
    const membership = await TeamMember.findOne({
      teamId: req.params.teamId,
      userId: req.user._id,
      status: 'active'
    });
    if (!membership) return res.status(403).json({ error: 'Not a member of this team' });
    req.membership = membership; // downstream handlers read req.membership.role
    next();
  } catch (err) {
    next(err);
  }
}

function requireTeamLeader(req, res, next) {
  if (req.membership.role !== 'leader') {
    return res.status(403).json({ error: 'Leader access required' });
  }
  next();
}

module.exports = { requireTeamMembership, requireTeamLeader };
