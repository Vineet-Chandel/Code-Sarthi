const express = require('express');
const router = express.Router({ mergeParams: true });
const { requireTeamMembership, requireTeamLeader } = require('../middleware/team');

const {
  createProject,
  listProjects,
  getProjectDetails,
  updateProject,
  archiveProject,
  deleteProject
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

// Issue endpoints tied to projects
router.post('/:projectId/issues', createIssue);
router.get('/:projectId/issues', listIssues);

module.exports = router;
