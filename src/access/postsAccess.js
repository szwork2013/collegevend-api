'use strict';

var Post = require('../models/post');

module.exports = function(req, res, next) {
  Post.findById(
    req.params.id,
    '_user',
    { lean: true },
    function(err, post) {
      if (post !== null && post._user !== req.user.username) {
        return res.send(401);
      }
      next();
    }
  );
};
