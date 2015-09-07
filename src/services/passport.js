'use strict';

var passport = require('passport');
var BearerStrategy = require('passport-http-bearer');
var User = require('../models/user');
var redis = require('./redis');

/**
 * Bearer strategy verification callback.
 *
 * @param  {String}   token - The Bearer token that needs to be verified.
 * @param  {Function} done  - Callback
 * @return {undefined}
 */
function verify(token, done) {
  var key = 'access_token:' + token;
  redis.get(key, function onGetToken(err, userId) {
    if (err) {
      return done(err);
    }
    if (userId === null) {
      return done(null, false);
    }
    User.findById(userId, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    });
  });
}

passport.use(new BearerStrategy(verify));

module.exports = passport.authenticate('bearer', { session: false });
