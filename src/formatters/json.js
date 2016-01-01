'use strict';

var restifyJSONFormatter = require('restify/lib/formatters/json');

function formatJSON(req, res, body, cb) {
  if (body instanceof Error && body.name === 'ValidationError') {
    body = body.details;
  }
  return restifyJSONFormatter(req, res, body, cb);
}

module.exports = formatJSON;
