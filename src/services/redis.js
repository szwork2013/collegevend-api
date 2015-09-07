'use strict';

var redis = require('redis');
var config = require('config');

var client = redis.createClient(
  config.get('services.redis.port'),
  config.get('services.redis.host'),
  config.get('services.redis.options')
);

module.exports = client;
