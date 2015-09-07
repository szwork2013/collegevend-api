'use strict';

module.exports = {
  services: {
    mongoose: {
      db: 'mongodb://localhost/test',
    },
    redis: {
      port: 6379,
      host: 'localhost',
      options: {},
    },
  },
  oauth2: {
    grants: [ 'password', 'refresh_token' ],
    debug: true,
  },
};
