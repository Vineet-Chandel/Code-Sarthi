const express = require('express');
const router = express.Router();
const projectRoutes = require('./projectRoutes');
const issueRoutes = require('./issueRoutes');
const contributionRoutes = require('./contributionRoutes');
const analyticsRoutes = require('./analyticsRoutes');
const { userAuth } = require('../middlewares/userAuth');
const { requireTeamMembership, requireTeamLeader } = require('../middleware/team');
const rateLimit = require('express-rate-limit');

const {
  createTeam,
  listMyTeams,
  getTeamDetails,
  updateTeam,
  archiveTeam,
  generateInviteCode,
  joinTeam,
  listMembers,
  removeMember,
  leaveTeam,
  transferOwnership
} = require('../controllers/teamController');

// Rate limiter for joining via invite code to prevent brute forcing
const joinLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 join attempts per windowMs
  message: { error: 'Too many join attempts, please try again after 15 minutes' }
});

router.use(userAuth); // All routes require authentication

// Global team routes
router.post('/', createTeam);
router.get('/mine', listMyTeams);
router.post('/join', joinLimiter, joinTeam);

// Routes requiring team membership
router.get('/:teamId', requireTeamMembership, getTeamDetails);
router.get('/:teamId/members', requireTeamMembership, listMembers);
router.post('/:teamId/leave', requireTeamMembership, leaveTeam);

// Routes requiring leader access
router.patch('/:teamId', requireTeamMembership, requireTeamLeader, updateTeam);
router.delete('/:teamId', requireTeamMembership, requireTeamLeader, archiveTeam);
router.post('/:teamId/invite', requireTeamMembership, requireTeamLeader, generateInviteCode);
router.delete('/:teamId/members/:userId', requireTeamMembership, requireTeamLeader, removeMember);
router.post('/:teamId/transfer-ownership', requireTeamMembership, requireTeamLeader, transferOwnership);

// Mount Sub-modules
router.use('/:teamId/projects', projectRoutes);
router.use('/:teamId/issues', requireTeamMembership, issueRoutes);
router.use('/:teamId/contributions', requireTeamMembership, contributionRoutes);
router.use('/:teamId/analytics', requireTeamMembership, analyticsRoutes);

module.exports = router;
