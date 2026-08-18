const express = require('express');
const router = express.Router({ mergeParams: true });
const { requireTeamMembership, requireTeamLeader } = require('../middleware/team');
const { userAuth } = require('../middlewares/userAuth');

const {
  createProject,
  listProjects,
  getProjectDetails,
  updateProject,
  archiveProject,
  deleteProject,
  notifyLeaderToLink,
  startGithubInstall
} = require('../controllers/projectController');

const {
  createIssue,
  listIssues
} = require('../controllers/issueController');

// Protect all project routes with membership middleware
router.use(requireTeamMembership);

router.post('/', createProject);
router.get('/', listProjects);
router.get('/:projectId', getProjectDetails);
router.patch('/:projectId', updateProject);
router.patch('/:projectId/archive', requireTeamLeader, archiveProject);
router.delete('/:projectId', requireTeamLeader, deleteProject);
router.post('/:projectId/notify-leader', notifyLeaderToLink);

// Issue endpoints tied to projects
router.post('/:projectId/issues', createIssue);
router.get('/:projectId/issues', listIssues);

router.get(
  "/github/install",
  userAuth,
  startGithubInstall
);
module.exports = router;
