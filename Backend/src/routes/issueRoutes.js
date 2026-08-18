const express = require('express');
const router = express.Router({ mergeParams: true });
const { requireIssueOwnerOrLeader } = require('../middleware/issue');

const { requireTeamMembership, requireTeamLeader, requireTeamLeaderOrAdmin } = require('../middleware/team');
const { userAuth } = require("../middlewares/userAuth");
const {
  listIssues,
  getIssueDetails,
  updateIssue,
  archiveIssue,
  deleteIssue,
  claimIssue,
  assignIssue,
  unclaimIssue
} = require('../controllers/issueController');

const {
  getIssueComments,
  createIssueComment,
  updateIssueComment,
  deleteIssueComment
} = require('../controllers/commentController');

// Mounted at /api/teams/:teamId/issues
router.get('/', userAuth, listIssues);
router.get('/:issueId', userAuth, getIssueDetails);
router.patch('/:issueId', userAuth, updateIssue);
router.patch('/:issueId/archive', userAuth, requireIssueOwnerOrLeader, archiveIssue);
router.delete('/:issueId', userAuth, requireTeamLeaderOrAdmin, deleteIssue);

// Assignment flows
router.post('/:issueId/claim', userAuth, claimIssue);
router.post('/:issueId/assign', userAuth, requireTeamLeaderOrAdmin, assignIssue);
router.post('/:issueId/unclaim', userAuth, unclaimIssue);

// Comments
router.get('/:issueId/comments', userAuth, getIssueComments);
router.post('/:issueId/comments', userAuth, createIssueComment);
router.patch('/:issueId/comments/:commentId', userAuth, updateIssueComment);
router.delete('/:issueId/comments/:commentId', userAuth, deleteIssueComment);

module.exports = router;
