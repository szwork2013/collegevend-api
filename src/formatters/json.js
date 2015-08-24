'use strict';

var restifyJSONFormatter = require('restify/lib/formatters/json');

function formatJSON(req, res, body) {
    if (body instanceof Error && body.name === 'ValidationError') {
        body = body.details;
    }
    return restifyJSONFormatter(req, res, body);
}

module.exports = formatJSON;
