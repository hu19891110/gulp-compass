'use strict';

var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  lib = ['**/*.js', '!node_modules/**/*', '!coverage/**/*'];


gulp.task('coverage', ['clean'], function(){
  return gulp.src(lib)
    .pipe($.istanbul())
    .pipe($.istanbul.hookRequire());
});

gulp.task('jshint', function () {
  return gulp.src(lib)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('mocha', ['coverage'], function () {
  return gulp.src('test/*_test.js')
    .pipe($.mocha({reporter: 'spec'}))
    .pipe($.istanbul.writeReports());
});

gulp.task('clean', require('del').bind(null, ['test/css', 'coverage']));

gulp.task('default', ['jshint', 'mocha']);
