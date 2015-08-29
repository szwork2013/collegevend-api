'use strict';

var joi = require('joi');
var postValidator = require('../../src/validators/postValidator');
var sinon = require('sinon');
var assert = require('assert');

describe('postValidator', function() {

  describe('validator', function() {

    var req = {
      body: { someKey: 'Some value...' },
      method: 'Some method...',
    };

    beforeEach(function() {
      sinon
        .stub(joi, 'validate')
        .withArgs(req.body, postValidator.schema);
    });

    afterEach(function() {
      joi.validate.restore();
    });

    it('should pass callback an error if schema is invalid', function() {
      var error = new Error('Some error...');
      joi.validate.returns({error: error});
      postValidator.validator(req, {}, function(err) {
        assert.equal(err, error);
      });
    });

    it('should pass null error to callback if schema is valid', function() {
      joi.validate.returns({error: null});
      postValidator.validator(req, {}, function(err) {
        assert.equal(err, null);
      });
    });

  });

});
