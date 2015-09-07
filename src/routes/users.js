'use strict';

var usersController = require('../controllers/usersController');
var userValidator = require('../validators/userValidator');
var usersAccess = require('../access/usersAccess');
var passport = require('../services/passport');

module.exports = function(server) {
  server.get(
    '/users/:username',
    passport,
    usersController.getUserEntityAction
  );
  server.put(
    'users/:username',
    passport,
    usersAccess,
    userValidator,
    usersController.putUserEntityAction
  );
};
