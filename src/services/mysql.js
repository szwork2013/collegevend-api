'use strict';

var mysql = require('mysql');
var config = require('../../config');

module.exports = mysql.createPool(config.services.mysql);
