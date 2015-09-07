'use strict';

var bcrypt = require('bcrypt');

var SALT_WORK_FACTOR = 10;

/**
 * BCrypt password encryption wrapper function.
 *
 * @param  {String}   password - The password to encrypt
 * @param  {Function} cb       - Callback where the second parameter is the
 * encrypted password.
 * @return {undefined}
 */
function encryptPassword(password, cb) {
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return cb(err);
    }

    bcrypt.hash(password, salt, function(err, hash) {
      if (err) {
        return cb(err);
      }

      cb(null, hash);
    });
  });
}

/**
 * Mongoose hook to use for 'save' calls to encrypt the password.
 *
 * @param  {Function} next - Callback
 * @return {undefined}
 */
function onPreSave(next) {
  if (!this.isModified('password')) {
    return next();
  }

  encryptPassword(this.password, function onEncryptPassword(err, hash) {
    if (err) {
      return next(err);
    }

    this.password = hash;
    next();
  });
}

/**
 * Mongoose hook to use for 'update' and 'findOneAndUpdate' calls to encrypt
 * the password.
 *
 * @param  {Function} next - Callback
 * @return {undefined}
 */
function onPreUpdate(next) {
  var update = this.getUpdate();

  if (!update.hasOwnProperty('password')) {
    return next();
  }

  encryptPassword(update.password, function onEncryptPassword(err, hash) {
    if (err) {
      return next(err);
    }

    update.password = hash;
    next();
  });
}

/**
 * Checks if the supplied passwords matches the User model's password.
 *
 * @param  {String}   candidate - The password we are checking.
 * @param  {Function} cb        - Callback
 * @return {undefined}
 */
function comparePassword(candidate, cb) {
  bcrypt.compare(candidate, this.password, function onCompare(err, matches) {
    if (err) {
      return cb(err);
    }
    cb(null, matches);
  });
}

module.exports = function encryptPasswordPlugin(schema) {
  schema.pre('save', onPreSave);
  schema.pre('findOneAndUpdate', onPreUpdate);
  schema.pre('update', onPreUpdate);

  schema.methods.comparePassword = comparePassword;
};
