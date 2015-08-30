'use strict';

var Post = require('../models/post');

module.exports = {
  getPostsCollectionAction: function(req, res, next) {
    Post.find(function(err, posts) {
      if (err) {
        return next(err);
      }
      res.send(posts);
    });
  },
  getPostEntityAction: function(req, res, next) {
    Post.findOne({_id: req.params.id}, function(err, post) {
      if (err)
        return next(err);
      if (!err && post === null) {
        return res.send(404);
      }
      res.send(post);
    });
  },
  postPostEntityAction: function(req, res, next) {
    req.body._user = req.user._id;
    var post = new Post(req.body);
    post.save(function(err) {
      if (err) {
        return next(err);
      }
      res.send(post);
    });
  },
  putPostEntityAction: function(req, res, next) {
    Post.findOneAndUpdate(
      {_id: req.params.id},
      req.body,
      { new: true },
      function(err, post) {
        if (err) {
          return next(err);
        }
        if (!err && post === null) {
          return res.send(404);
        }
        res.send(post);
      }
    );
  },
  deletePostEntityAction: function(req, res, next) {
    Post.findOneAndRemove({_id: req.params.id}, function(err, post) {
      if (err) {
        return next(err);
      }
      if (!post) {
        return res.send(404);
      }
      res.send(204);
    });
  },
};
