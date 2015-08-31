'use strict';

var usersController = require('../controllers/usersController');
var userValidator = require('../validators/userValidator');
var usersAccess = require('../access/usersAccess');
var auth = require('../services/auth');

module.exports = function(server) {
  server.get(
    '/users/:username',
    auth,
    usersController.getUserEntityAction
  );
  server.put(
    'users/:username',
    auth,
    usersAccess,
    userValidator,
    usersController.putUserEntityAction
  );
};
