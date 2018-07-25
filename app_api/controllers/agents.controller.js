const mongoose = require('mongoose');
const Age = mongoose.model('Agent');
 
const agentsList = function(req, res) {
    Age.find({}, function(err, agents){
        if (err){
            res.send(err);
        } else {
            res.json(agents);
        }
    });
};

const agentsCreate = function(req, res) {
    Age.create({
        name: req.body.name,
        role: req.body.role,
        roleDesc: req.body.roleDesc,
        address: req.body.address,
        products: req.body.products.split(","),
        team: req.body.team,
        workingTimes: [{
                days: req.body.days1,
                start: req.body.start1,
                end: req.body.end1,
                closed: req.body.closed1
        }]
        //     days: req.body.days1,
        //     start: req.body.start1,
        //     end: req.body.end1,
        //     closed: req.body.closed1,
        //   }, {
        //     days: req.body.days2,
        //     start: req.body.start2,
        //     end: req.body.end2,
        //     closed: req.body.closed2,
        //   }]
    }, (err, agent) => {
        if (err){
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(201)
                .json(agent);
        }
    })
};

const agentsReadOne = function(req, res) {
    if (req.params && req.params.agentid){
      Age
        .findById(req.params.agentid)
        .exec((err, agent) => {
            if (!agent){
                res
                    .status(404)
                    .json({
                        "message" : "agentid not found"
                    });
                return;
            } else if (err) {
                res
                    .status(404)
                    .json(err);
                return;
            }
            res
                .status(200)
                .json(agent);
        });
    } else {
        res
            .status(404)
            .json({
                "message" : "No agentid in request"
            });
    }
};

const agentsUpdateOne = function (req, res) {
    if (!req.params.agentid) {
      res
        .status(404)
        .json({
          "message": "Not found, agentid is required"
        });
      return;
    }
    Age
      .findById(req.params.agentid)
      .exec((err, agent) => {
        if (!agent) {
          res
            .json(404)
            .status({
              "message": "agentid not found"
            });
          return;
        } else if (err) {
          res
            .status(400)
            .json(err);
          return;
        }
        agent.name = req.body.name;
        agent.role = req.body.role;
        agent.roleDesc = req.body.roleDesc;
        agent.address = req.body.address;
        agent.products = (req.body.products + '').split(",");
        agent.team = req.body.team;
        agent.workingTimes = [{
            days: req.body.days1,
            start: req.body.start1,
            end: req.body.end1,
            closed: req.body.closed1
        }]
        //     days: req.body.days1,
        //     start: req.body.start1,
        //     end: req.body.end1,
        //     closed: req.body.closed1,
        //   }, {
        //     days: req.body.days2,
        //     start: req.body.start2,
        //     end: req.body.end2,
        //     closed: req.body.closed2,
        //   }];
        agent.save((err, agent) => {
          if (err) {
            res
              .status(404)
              .json(err);
          } else {
            res
              .status(200)
              .json(agent);
          }
        });
      }
    );
  };

const agentsDeleteOne = function (req, res) {
const agentid = req.params.agentid;
if (agentid) {
    Age
    .findByIdAndRemove(agentid) 
    .exec((err, agent) => {
        if (err) {
            res
            .status(404)
            .json(err);
            return;
        }
        res
            .status(204)
            .json(null);
        }
    );
} else {
    res
    .status(404)
    .json({
        "message": "No agentid"
    });
}
};

module.exports = {   
    agentsList,   
    agentsCreate,   
    agentsReadOne,   
    agentsUpdateOne,   
    agentsDeleteOne 
}; 