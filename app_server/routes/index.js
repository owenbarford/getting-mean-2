const express = require('express');
const router = express.Router();
const ctrlAgents = require('../controllers/agents');
const ctrlOthers = require('../controllers/others');

/* Agents pages. */
router.get('/', ctrlAgents.homelist);
router.get('/agent/:agentid', ctrlAgents.agentInfo);

/* Other pages. */
router.get('/about', ctrlOthers.about);

module.exports = router;
