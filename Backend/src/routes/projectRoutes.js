const express = require('express');
const router = express.Router({ mergeParams: true });
const { requireTeamMembership, requireTeamLeader } = require('../middleware/team');

const {
  createProject,
  listProjects,
  getProjectDetails,
  updateProject,
  archiveProject
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
router.delete('/:projectId', requireTeamLeader, archiveProject);

// Issue endpoints tied to projects
router.post('/:projectId/issues', createIssue);
router.get('/:projectId/issues', listIssues);

module.exports = router;
