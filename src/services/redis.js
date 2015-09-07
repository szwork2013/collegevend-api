'use strict';

var redis = require('redis');

var config = require('../../config');

var client = redis.createClient(
  config.services.redis.port,
  config.services.redis.host,
  config.services.redis.options
);

module.exports = client;
