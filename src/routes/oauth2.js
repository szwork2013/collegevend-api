'use strict';

var oauth2 = require('../oauth2');

module.exports = function(server) {
  server.post('/oauth2/token', [
    function restifyCompatible(req, res, next) {
      // Necessary for compatibility...
      req.body = req.params;
      res.jsonp = res.send;
      next();
    },
    oauth2.createServer().grant(),
  ]);
};
