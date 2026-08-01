const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  getMemberActivity,
  getContributionTrend,
  getCompletionRate,
  getAssignmentSplit,
  getIdleMembers,
  getProjectBreakdown
} = require('../controllers/analyticsController');

router.get('/member-activity', getMemberActivity);
router.get('/contribution-trend', getContributionTrend);
router.get('/completion-rate', getCompletionRate);
router.get('/assignment-split', getAssignmentSplit);
router.get('/idle-members', getIdleMembers);
router.get('/project-breakdown', getProjectBreakdown);

module.exports = router;
