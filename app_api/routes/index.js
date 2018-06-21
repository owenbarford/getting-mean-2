const express = require('express');
const router = express.Router();
const ctrlAgents = require('../controllers/agents.controller');
const ctrlListAgents = require('../controllers/listagents.controller');
const ctrlPolicies = require('../controllers/policies.controller');

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

// policies
router
.route('/policies')
.get(ctrlPolicies.listPolicies)
.post(ctrlPolicies.policiesCreate);

router
.route('/policies/:_id')
.get(ctrlPolicies.policiesReadOne)
.put(ctrlPolicies.policiesUpdateOne)
.delete(ctrlPolicies.policiesDeleteOne);
 
module.exports = router;
