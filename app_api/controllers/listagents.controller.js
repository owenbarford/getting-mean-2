const mongoose = require('mongoose');
const List = mongoose.model('listAgents', 'listAgents');
 
const listAgents = function(req, res) {
    List.find({}, function(err, listAgents){
        if (err){
            res.send(err);
        } else {
            res.json(listAgents);
        }
    });
};

module.exports = {   
    listAgents
}; 