'use strict';

module.exports = function(server) {
  require('./posts')(server);
  require('./users')(server);
};
