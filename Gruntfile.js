'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['./**/*.js'],
      options: {
        jshintrc: true,
        ignores: ['./node_modules/**'],
      },
    },
    jscs: {
      all: ['./**/*.js'],
      options: {
        config: './.jscsrc',
        excludeFiles: ['./node_modules/**'],
      },
    },
    mochaTest: {
      test: {
        src: './test/**/*.js',
        options: {
          reporter: 'spec',
          clearRequireCache: true,
          require: './coverage/blanket',
        },
      },
      coverage: {
        options: {
          reporter: 'html-cov',
          quiet: true,
          captureFile: './coverage.html',
        },
        src: './test/**/*.js',
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('validate', ['jshint', 'jscs', 'mochaTest']);

};
