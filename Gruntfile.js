'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['Gruntfile.js', 'src/{,*/}*.js'],
      options: {
        jshintrc: true,
      },
    },
    jscs: {
      all: ['Gruntfile.js', 'src/{,*/}*.js'],
      options: {
        config: './.jscsrc',
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.registerTask('validate', ['jshint', 'jscs']);

};
