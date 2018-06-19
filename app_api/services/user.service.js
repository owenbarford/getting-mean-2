var config = require('../config.json');
var express = require('express');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('../_helpers/convertToObjectId');

var mongoose = require('mongoose');
var User = mongoose.model('User');

var service = {};

service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function authenticate(userName, password) {
    var foundUser;
    return Q(User.findOne({userName: userName}).exec())
    .then(function(user) {
        if (user && bcrypt.compareSync(password, user.hash)) {
            foundUser = user;
            // foundUser.token = jwt.sign({ sub: user._id }, config.secret)
            foundUser.token = jwt.sign({sub: config.clientId}, config.secret)
            console.log(foundUser.token);
            return user = foundUser;  
        }   
     })
    .catch(function(err){
        console.log(err.name + ': ' + err.message);
    })
};

function getAll() {
    return Q(User.find().toArray.exec())
    .then(function(users) {
        // return users (without hashed passwords)
        users = _.map(users, function (user) {
            return _.omit(user, 'hash');
        })
    })    
    .catch(function(err){
        console.log(err.name + ': ' + err.message);
    })
};

function getById(_id) {
    return Q(User.findById(_id).exec())
    .then(function(user) {
        if (user) {
            // return user (without hashed password)
            return _.omit(user, 'hash');
        }
    })
    .catch(function(err) {
        console.log(err.name + ': ' + err.message);
    })
};

function create(userParam) {
    // validation
    return Q(User.findOne({ userName: userParam.userName }).exec())
    .then(function(user) {
        if (user) {
            // username already exists
            console.log('Username "' + userParam.username + '" is already taken');
            } else {
                console.log('time to create user.');
                createUser();
            }
    });

    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password');

        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);
        
        return Q(User.create(user).exec())
        .then(function(){
            return User.find({userName: userParam.userName});
        })
        .catch(function(err){
            console.log(err.name + ': ' + err.message);
        })
    }
};

function update(_id, userParam) {
    // validation
    return Q(User.findById(_id).exec())
        .then(function(user) {
            if (user.userName !== userParam.username) {
                return Q(User.findOne({ username: userParam.userName }).exec())
                    .then(function (user) {
                        if (user) {
                            console.log('Username "' + req.body.userName + '" is already taken')
                        } else {
                            updateUser();
                        }
                    })
                    .catch(function(err){
                        console.log(err.name + ': ' + err.message);
                    })
            } else {
                updateUser();
            }
        })
        .catch(function(err){
            console.log(err.name + ': ' + err.message);
        });

    function updateUser() {
        // fields to update
        console.log('updateUser')
        var set = {
            firstName: userParam.firstName,
            lastName: userParam.lastName,
            userName: userParam.userName,
            email: userParam.email
        };

        // update password if it was entered
        if (userParam.password) {
            set.hash = bcrypt.hashSync(userParam.password, 10);
        }

        return Q(User.update({ _id: mongo.toObjectID(_id) }, { $set: set }).exec())
            .then(function (doc){
                console.log('user updated')
                })
            .catch(function(err){
                console.log(err.name + ': ' + err.message);
            });
        } 
    
    return;
};

function _delete(_id) {
    return Q(User.remove({ _id: mongo.toObjectID(_id) }).exec())
        .then(function(user){
            return user;
        })
        .catch(function(err){
            console.log(err.name + ': ' + err.message);
        }); 

    return;
};
