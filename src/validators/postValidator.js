'use strict';

var joi = require('joi');

var joiValidator = require('./joiValidator');

var schema = joi.object().keys({
  price: joi
    .number()
    .positive()
    .less(10000)
    .precision(2)
    .required(),
  description: joi
    .string()
    .min(25)
    .required(),
});

module.exports = joiValidator(schema);
