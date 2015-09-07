'use strict';

var User = require('../models/user');

function getUserEntityAction(req, res, next) {
  User.findOne({ username: req.params.username }, function(err, user) {
    if (err)
      return next(err);
    if (!err && user === null) {
      return res.send(404);
    }
    res.send(user);
  });
}

function putUserEntityAction(req, res, next) {
  User.findOneAndUpdate(
    { username: req.params.username },
    req.body,
    { new: true },
    function(err, user) {
      if (err) {
        return next(err);
      }
      if (!err && user === null) {
        return res.send(404);
      }
      res.send(user);
    }
  );
}

module.exports = {
  getUserEntityAction: getUserEntityAction,
  putUserEntityAction: putUserEntityAction,
};
