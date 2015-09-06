'use strict';

var oauth2server = require('oauth2-server');
var config = require('../../config');
var model = require('./model');

function createServer() {
  return oauth2server({
    model: model,
    grants: config.oauth2.grants,
    debug: config.oauth2.debug,
  });
}

module.exports = {
  createServer: createServer,
};
