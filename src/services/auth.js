'use strict';

var passport = require('passport');
var BearerStrategy = require('passport-http-bearer');
var User = require('../models/User');

passport.use(new BearerStrategy(
  function verify(token, done) {
    User.findOne({ access_tokens: token }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    });
  }
));

module.exports = passport.authenticate('bearer', { session: false });
