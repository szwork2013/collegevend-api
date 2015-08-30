'use strict';

var usersController = require('../controllers/usersController');
var userValidator = require('../validators/userValidator');
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
    userValidator,
    usersController.putUserEntityAction
  );
};
