'use strict';

var mongoose = require('../services/mongoose');

var refreshTokenSchema = new mongoose.Schema({
  refreshToken: String,
  clientId: String,
  userId: String,
  expires: Date,
});

var RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);

module.exports = RefreshToken;
