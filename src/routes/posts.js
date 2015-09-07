'use strict';

var postsController = require('../controllers/postsController');
var postValidator = require('../validators/postValidator');
var passport = require('../services/passport');
var postsAccess = require('../access/postsAccess');

module.exports = function(server) {
  server.get(
    '/posts',
    postsController.getPostsCollectionAction
  );
  server.get('/posts/:id', postsController.getPostEntityAction);
  server.post(
    '/posts',
    passport,
    postValidator,
    postsController.postPostEntityAction
  );
  server.put(
    'posts/:id',
    passport,
    postsAccess,
    postValidator,
    postsController.putPostEntityAction
  );
  server.del(
    '/posts/:id',
    passport,
    postsAccess,
    postsController.deletePostEntityAction
  );
};
