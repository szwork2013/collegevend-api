'use strict';

var joiValidator = require('../../src/validators/joiValidator');
var joi = require('joi');
var sinon = require('sinon');
var assert = require('assert');

describe('joiValidator', function() {

  var schema = {
    key: 'Some schema...',
  };

  var req = {
    body: { someKey: 'Some value...' },
    method: 'Some method...',
  };

  beforeEach(function() {
    sinon
      .stub(joi, 'validate')
      .withArgs(req.body, schema);
  });

  afterEach(function() {
    joi.validate.restore();
  });

  it('should pass callback an error if schema is invalid', function() {
    var error = new Error('Some error...');

    joi.validate.returns({error: error});

    var validator = joiValidator(schema);
    validator(req, {}, function(err) {
      assert.equal(err, error);
    });
  });

  it('should pass null error to callback if schema is valid', function() {
    joi.validate.returns({error: null});

    var validator = joiValidator(schema);
    validator(req, {}, function(err) {
      assert.equal(err, null);
    });
  });

});
