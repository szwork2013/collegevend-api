'use strict';

module.exports = function usersAccess(req, res, next) {
  if (req.user.username !== req.params.username) {
    return res.send(401);
  }
  next();
};
