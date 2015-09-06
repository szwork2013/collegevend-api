'use strict';

var mongoose = require('../services/mongodb');

var clientSchema = new mongoose.Schema({
  name: String,
  clientId: String,
  clientSecret: String,
  grantTypes: {},
});

var Client = mongoose.model('Client', clientSchema);

module.exports = Client;
