'use strict';

module.exports = {
  paths: {
    src: __dirname + '/src',
    test: __dirname + '/test',
  },
  test: {
    mocha: {
    },
    instrument: {
      pattern: [
        'src/**/*.js',
      ],
    },
    reports: __dirname + '/coverage',
  },
  nodemon: {
    script: __dirname + '/src/app.js',
    ignore: [
      __dirname + '/test',
    ],
  },
};
