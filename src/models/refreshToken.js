'use strict';

var mongoose = require('../services/mongodb');

var refreshTokenSchema = new mongoose.Schema({
  refreshToken: String,
  clientId: String,
  userId: String,
  expires: Date,
});

var RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);

module.exports = RefreshToken;
