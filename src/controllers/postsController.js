'use strict';

var postsService = require('../services/postsService');

module.exports = {
  getPostsCollectionAction: function(req, res, next) {
    postsService.fetchCollection(function onFetchCollection(err, posts) {
      if (err)
        return next(err);
      res.send(posts);
    });
  },
  getPostEntityAction: function(req, res, next) {
    postsService.fetchById(req.params.id, function onFetchById(err, post) {
      if (err) {
        if (err.name === 'InvalidArgumentError')
          return res.send(404);
        return next(err);
      }
      res.send(post);
    });
  },
  postPostEntityAction: function(req, res, next) {
    postsService.create(req.body, function onCreate(err, post) {
      if (err)
        return next(err);
      res.send(post);
    });
  },
  putPostEntityAction: function(req, res, next) {
    postsService.updateById(
      req.params.id,
      req.body,
      function onUpdateById(err, post) {
        if (err) {
          if (err.name === 'InvalidArgumentError')
            return res.send(404);
          return next(err);
        }
        res.send(post);
      }
    );
  },
  deletePostEntityAction: function(req, res, next) {
    postsService.deleteById(req.params.id, function onDeleteById(err) {
      if (err) {
        if (err.name === 'InvalidArgumentError')
          return res.send(404);
        return next(err);
      }
      res.send(204);
    });
  },
};
