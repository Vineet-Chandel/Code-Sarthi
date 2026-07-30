const express = require('express');
const router = express.Router({ mergeParams: true });
const { requireIssueOwnerOrLeader } = require('../middleware/issue');

const { requireTeamMembership, requireTeamLeader } = require('../middleware/team');

const {
  getIssueDetails,
  updateIssue,
  archiveIssue,
  claimIssue,
  assignIssue,
  unclaimIssue
} = require('../controllers/issueController');

// Mounted at /api/teams/:teamId/issues
router.get('/:issueId', getIssueDetails);
router.patch('/:issueId', updateIssue);
router.delete('/:issueId', requireIssueOwnerOrLeader, archiveIssue);

// Assignment flows
router.post('/:issueId/claim', claimIssue);
router.post('/:issueId/assign', requireTeamLeader, assignIssue);
router.post('/:issueId/unclaim', unclaimIssue);

module.exports = router;
