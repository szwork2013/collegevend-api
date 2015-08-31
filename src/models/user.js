'use strict';

var mongoose = require('../services/mongodb');

var userSchema = new mongoose.Schema({
  username: String,
  first_name: String,
  last_name: String,
  access_tokens: [String],
});

userSchema.set('toJSON', {
  transform: function transform(doc, ret) {
    delete ret.access_tokens;
  },
});

var User = mongoose.model('User', userSchema);

module.exports = User;
