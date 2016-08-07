'use strict';
var path = require('path'),
    faucet = require('faucet'),
    gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    $ = gulpLoadPlugins();

gulp.task('static', function () {
  return gulp.src('**/*.js')
    .pipe($.excludeGitignore())
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

gulp.task('nsp', function (cb) {
  $.nsp({package: path.resolve('package.json')}, cb);
});

gulp.task('pre-test', function () {
  return gulp.src('app/**/*.js')
    .pipe($.excludeGitignore())
    .pipe($.istanbul({
      includeUntested: true
    }))
    .pipe($.istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function (cb) {
  var tapeErr,
      exitCode;

  gulp.src('test/test.js')
    .pipe($.plumber())
    .pipe($.tape({ reporter: faucet() }))
    .on('error', function (err) {
      tapeErr = err;
    })
    .pipe($.istanbul.writeReports({
      reporters: ['lcovonly']
    }))
    .on('end', function () {
      cb(tapeErr);
      exitCode = tapeErr ? 1 : 0;
      process.exit(exitCode);
    });
});

gulp.task('coveralls', function() {
  gulp.src('coverage/lcov.info')
    .pipe($.coveralls()).on('end', function(){
      console.log('sent to coveralls');
    })
})

gulp.task('watch', function () {
  gulp.watch(['generators/**/*.js', 'test/**'], ['test']);
});

gulp.task('prepublish', ['nsp']);
gulp.task('default', ['static', 'test']);
