'use strict';

var joi = require('joi');
var joiValidator = require('./joiValidator');

var schema = joi.object().keys({
  first_name: joi
    .string()
    .min(3)
    .max(20)
    .trim()
    .required(),
  last_name: joi
    .string()
    .max(20)
    .allow('')
    .trim(),
});

module.exports = joiValidator(schema);
