'use strict';

var joi = require('joi');

module.exports = function createValidator(schema) {
  return function joiValidator(req, res, next) {
    var result = joi.validate(req.body, schema);
    if (result.error !== null) {
      return next(result.error);
    }
    req.body = result.value;
    next();
  };
};
