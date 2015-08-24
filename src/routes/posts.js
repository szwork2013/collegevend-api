'use strict';

var postsController = require('../controllers/postsController');
var postValidator = require('../validators/postValidator');

module.exports = function(server) {
  server.get('/posts', postsController.getPostsCollectionAction);
  server.get('/posts/:id', postsController.getPostEntityAction);
  server.post(
    '/posts',
    postValidator.validator,
    postsController.postPostEntityAction
  );
  server.put(
    'posts/:id',
    postValidator.validator,
    postsController.putPostEntityAction
  );
  server.del('/posts/:id', postsController.deletePostEntityAction);
};
