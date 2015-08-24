'use strict';

var joi = require('joi');

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

module.exports = {
  schema: schema,
  validator: function validator(req, res, next) {
    var result = joi.validate(req.body, schema, {
      context: {method: req.method},
    });
    if (result.error !== null) {
      return next(result.error);
    }
    req.body = result.value;
    next();
  },
};
