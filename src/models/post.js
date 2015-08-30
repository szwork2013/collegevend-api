'use strict';

var mongoose = require('../services/mongodb');

var postSchema = new mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  price: Number,
  description: String,
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
