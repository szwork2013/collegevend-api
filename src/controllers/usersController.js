'use strict';

var User = require('../models/user');

module.exports = {
  getUserEntityAction: function(req, res, next) {
    User.findById(req.params.username, function(err, user) {
      if (err)
        return next(err);
      if (!err && user === null) {
        return res.send(404);
      }
      res.send(user);
    });
  },
  putUserEntityAction: function(req, res, next) {
    User.findOneAndUpdate(
      {_id: req.params.username},
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
  },
};
