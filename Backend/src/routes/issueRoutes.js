const express = require('express');
const router = express.Router({ mergeParams: true });
const { requireIssueOwnerOrLeader } = require('../middleware/issue');

const {
  getIssueDetails,
  updateIssue,
  archiveIssue
} = require('../controllers/issueController');

// Mounted at /api/teams/:teamId/issues
router.get('/:issueId', getIssueDetails);
router.patch('/:issueId', updateIssue);
router.delete('/:issueId', requireIssueOwnerOrLeader, archiveIssue);

module.exports = router;
