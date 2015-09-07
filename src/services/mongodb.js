'use strict';

var mongoose = require('mongoose');

var config = require('../../config');

mongoose.connect(config.services.mongodb.db);

var db = mongoose.connection;

db.on(
  'error',
  console.error.bind(console, 'MongoDB connection error:')
);

module.exports = mongoose;
