const express = require('express');
const router = express.Router();
const ctrlAgents = require('../controllers/agents.controller');
const ctrlListAgents = require('../controllers/listagents.controller');

// agents
router
  .route('/agents')
  .get(ctrlAgents.agentsList)
  .post(ctrlAgents.agentsCreate);

router
  .route('/agents/:agentid')
  .get(ctrlAgents.agentsReadOne)
  .put(ctrlAgents.agentsUpdateOne)
  .delete(ctrlAgents.agentsDeleteOne);

// listagent
router
.route('/listagents')
.get(ctrlListAgents.listAgents);
 
module.exports = router;
