const express = require('express');
const router = express.Router();
const ctrlAgents = require('../controllers/agents');

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
  
module.exports = router;