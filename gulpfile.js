'use strict';

// Imports
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require('./gulpfile.conf');

// Environment
var env = {
  prod: process.env.NODE_ENV === 'production',
  port: process.env.PORT ? process.env.PORT : '3000',
};
env.dev = !env.prod;

gulp.task('jscs', function() {
  return gulp.src([config.paths.src, config.paths.test])
    .pipe(plugins.jscs())
    .pipe(plugins.jscs.reporter());
});

gulp.task('jshint', function() {
  return gulp.src([config.paths.src, config.paths.test])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'));
});

gulp.task('test', function() {
  return gulp.src(config.paths.test + '/**/*.js', { read: false })
    .pipe(plugins.coverage.instrument(config.test.instrument))
    .pipe(plugins.mocha(config.test.mocha))
    .pipe(plugins.coverage.gather())
    .pipe(plugins.coverage.format())
    .pipe(gulp.dest(config.test.reports));
});

gulp.task('dev', ['default'], function() {
  plugins.nodemon(config.nodemon);
});

gulp.task('default', ['jscs', 'jshint', 'test']);
