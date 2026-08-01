const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  startContribution,
  stopContribution,
  getActiveContribution
} = require('../controllers/contributionController');

router.post('/start', startContribution);
router.post('/stop', stopContribution);
router.get('/active', getActiveContribution);

module.exports = router;
