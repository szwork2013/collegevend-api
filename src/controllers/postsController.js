'use strict';

var Post = require('../models/post');
var config = require('config');

var limit = config.get('posts.limit');

function buildPostQuery(query) {
  var conditions = {};
  var projection = {};
  var sort = {};

  if (query.search !== undefined) {
    conditions.$text = {
      $search: query.search,
    };
    projection.score = {
      $meta: 'textScore',
    };
    sort.score = {
      $meta: 'textScore',
    };
  }

  return {
    conditions: conditions,
    projection: projection,
    sort: sort,
  };
}

function getPostsCollectionAction(req, res, next) {
  var query = buildPostQuery(req.query);

  Post
    .find(query.conditions, query.projection)
    .sort(query.sort)
    .limit(limit)
    .exec(function(err, posts) {
      if (err) {
        return next(err);
      }
      res.send(posts);
    });
}

function getPostEntityAction(req, res, next) {
  Post.findOne({_id: req.params.id}, function(err, post) {
    if (err)
      return next(err);
    if (!err && post === null) {
      return res.send(404);
    }
    res.send(post);
  });
}

function postPostEntityAction(req, res, next) {
  req.body._user = req.user.username;
  var post = new Post(req.body);
  post.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send(post);
  });
}

function putPostEntityAction(req, res, next) {
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
}

function deletePostEntityAction(req, res, next) {
  Post.findOneAndRemove({_id: req.params.id}, function(err, post) {
    if (err) {
      return next(err);
    }
    if (!post) {
      return res.send(404);
    }
    res.send(204);
  });
}

module.exports = {
  getPostsCollectionAction: getPostsCollectionAction,
  getPostEntityAction: getPostEntityAction,
  postPostEntityAction: postPostEntityAction,
  putPostEntityAction: putPostEntityAction,
  deletePostEntityAction: deletePostEntityAction,
};
