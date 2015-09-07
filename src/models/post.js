'use strict';

var mongoose = require('../services/mongoose');

var postSchema = new mongoose.Schema({
  _user: {
    type: String,
    ref: 'User',
    required: true,
  },
  price: Number,
  description: String,
});

postSchema.set('toJSON', {
  transform: function transform(doc, ret) {
    delete ret._user;
  },
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
