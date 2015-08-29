'use strict';

var mongoose = require('../services/mongodb');

var userSchema = mongoose.Schema({
  access_tokens: [String],
});

var User = mongoose.model('User', userSchema);

module.exports = User;
