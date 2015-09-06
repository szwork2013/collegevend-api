'use strict';

module.exports = function(server) {
  require('./oauth2')(server);
  require('./posts')(server);
  require('./users')(server);
};
