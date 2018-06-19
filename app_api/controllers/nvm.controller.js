var config = require('../config.json');
var express = require('express');
var router = express.Router();
var nvmService = require('../services/nvm.service');

// routes
router.post('/', getNvmToken);

module.exports = router

function getNvmToken(req, res) {
    console.log('nvm controller: ' + req.body)
    nvmService.getNvmToken(req.body.grant_type)
        .then(function (token) {
            if (token) {
                // authentication successful
                res.send(token);
            } else {
                // authentication failed
                res.status(400).send('nvm token retrieval failed');
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}