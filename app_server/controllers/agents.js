/* GET 'home' page */ 
const homelist = function(req, res){
    res.render('agents-list', { title: 'Home' }); 
}; 
 
/* GET 'Agent info' page */
const agentInfo = function(req, res){
    res.render('agent-info', { title: 'Agent info' }); 
}; 

module.exports = {   
    homelist,
    agentInfo    
}; 