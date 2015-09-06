'use strict';

var redis = require('redis');
var config = require('../../config/services/redis');

var client = redis.createClient(
  config.port,
  config.host,
  config.options
);

module.exports = client;
