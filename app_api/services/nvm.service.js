var config = require('../config.json');
var express = require('express');
var https = require('https');

var service = {};

service.getNvmToken = getNvmToken;

module.exports = service;

function getNvmToken(data) {
    console.log('do we get here?');
};



