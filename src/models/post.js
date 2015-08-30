'use strict';

var mongoose = require('../services/mongodb');

var postSchema = new mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
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
