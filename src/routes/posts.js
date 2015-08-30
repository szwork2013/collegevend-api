'use strict';

var postsController = require('../controllers/postsController');
var postValidator = require('../validators/postValidator');
var auth = require('../services/auth');

module.exports = function(server) {
  server.get(
    '/posts',
    postsController.getPostsCollectionAction
  );
  server.get('/posts/:id', postsController.getPostEntityAction);
  server.post(
    '/posts',
    auth,
    postValidator,
    postsController.postPostEntityAction
  );
  server.put(
    'posts/:id',
    auth,
    postValidator,
    postsController.putPostEntityAction
  );
  server.del(
    '/posts/:id',
    auth,
    postsController.deletePostEntityAction
  );
};
