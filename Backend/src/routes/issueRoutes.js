const express = require('express');
const router = express.Router({ mergeParams: true });
const { requireIssueOwnerOrLeader } = require('../middleware/issue');

const { requireTeamMembership, requireTeamLeader, requireTeamLeaderOrAdmin } = require('../middleware/team');

const {
  getIssueDetails,
  updateIssue,
  archiveIssue,
  deleteIssue,
  claimIssue,
  assignIssue,
  unclaimIssue
} = require('../controllers/issueController');

// Mounted at /api/teams/:teamId/issues
router.get('/:issueId', getIssueDetails);
router.patch('/:issueId', updateIssue);
router.patch('/:issueId/archive', requireIssueOwnerOrLeader, archiveIssue);
router.delete('/:issueId', requireTeamLeaderOrAdmin, deleteIssue);

// Assignment flows
router.post('/:issueId/claim', claimIssue);
router.post('/:issueId/assign', requireTeamLeaderOrAdmin, assignIssue);
router.post('/:issueId/unclaim', unclaimIssue);

module.exports = router;
