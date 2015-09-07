'use strict';

var mongoose = require('../services/mongoose');
var encryptPassword = require('./plugins/encryptPassword');

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  first_name: String,
  last_name: String,
});

userSchema.set('toJSON', {
  transform: function transform(doc, ret) {
    delete ret.password;
  },
});

userSchema.plugin(encryptPassword);

var User = mongoose.model('User', userSchema);

module.exports = User;
