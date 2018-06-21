const mongoose = require('mongoose');
const Policy = mongoose.model('Policy', 'policy');

const listPolicies = function(req, res) {
    Policy.find({}, function(err, listPolicies){
        if (err){
            res.send(err);
        } else {
            res.json(listPolicies);
        }
    });
};

const policiesReadOne = function(req, res) {
    if (req.params && req.params._id){
      Policy
        .findById(req.params._id)
        .exec((err, policy) => {
            if (!policy){
                res
                    .status(404)
                    .json({
                        "message" : "id not found"
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
                .json(policy);
        });
    } else {
        res
            .status(404)
            .json({
                "message" : "No id in request"
            });
    }
};

const policiesCreate = function(req, res) {
    Policy.create({
        title: req.body.title,
        createdBy: req.body.createdBy,
        policyText: req.body.policyText,
    }, (err, policy) => {
        if (err){
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(201)
                .json(policy);
        }
    })
};

const policiesUpdateOne = function (req, res) {
    if (!req.params._id) {
      res
        .status(404)
        .json({
          "message": "Not found, id is required"
        });
      return;
    }
    Policy
      .findById(req.params._id)
      .exec((err, policy) => {
        if (!policy) {
          res
            .json(404)
            .status({
              "message": "id not found"
            });
          return;
        } else if (err) {
          res
            .status(400)
            .json(err);
          return;
        }
        policy.title = req.body.title;
        policy.createdBy = policy.createdBy;
        policy.createdOn = policy.createdOn;
        policy.policyText = req.body.policyText;
        policy.save((err, policy) => {
          if (err) {
            res
              .status(404)
              .json(err);
          } else {
            res
              .status(200)
              .json(policy);
          }
        });
      }
    );
  };

const policiesDeleteOne = function (req, res) {
const policyid = req.params._id;
if (policyid) {
    Policy
     .findByIdAndRemove(policyid) 
     .exec((err, policy) => {
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
        "message": "No id"
    });
}
};

module.exports = {   
    listPolicies,
    policiesReadOne,
    policiesCreate,
    policiesUpdateOne,
    policiesDeleteOne
}; 