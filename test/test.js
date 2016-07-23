'use strict';
var path = require('path');
var before = require('tape-catch');
var test = require('tape-catch');
var after = require('tape-catch');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var rewire = require('rewire');
var gulp = require('gulp');
var semver = require('semver');
var gulpfile = rewire('../app/templates/gulpfile');
var sketch = rewire('../app/templates/sketch');
var fs = require('fs');

before('preparing tests...', function(t) {
  helpers.run(path.join(__dirname, '../app'))
    .withPrompts({someAnswer: true})
    .toPromise()
    .then(function(){
      t.end();
    });
});

test('versioning is correct', function(t){
  var file = fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8');
  var version = JSON.parse(file).version;
  t.ok(semver(version));
  t.end();
});

test('p5-yeoman-generator creates files', function(t) {
  assert.file([
    'package.json',
    '.gitignore',
    'bower.json',
    'favicon.ico',
    'gulpfile.js',
    'index.html',
    'sketch.js',
    'assets'
  ]);
  t.end();
});

test('creates gulp task to serve', function(t) {
  t.ok(gulp.tasks.serve);
  t.end();
});

test('gulp serve runs browser-sync', function(t) {
  var browserSyncRun = false;
  var revert = gulpfile.__set__({
    browserSync: function(){
      browserSyncRun = true;
    }
  });
  gulp.tasks.serve.fn();
  t.true(browserSyncRun);
  revert();
  t.end();
});

test('sketch.js file does some stuff too', function(t) {
  var setup = sketch.__get__('setup'),
      draw = sketch.__get__('draw'),
      canvasCreated = false,
      shapeFilled = false,
      strokeMade = false;
  var revert = sketch.__set__({
    createCanvas: function(){ canvasCreated = true; },
    fill: function(){ shapeFilled = true; },
    stroke: function(){ strokeMade = true; },
    random: function(){},
    background: function(){},
    strokeWeight: function(){},
    ellipse: function(){}
  });
  t.equal(typeof setup, 'function');
  t.equal(typeof draw, 'function');
  setup();
  draw();
  t.true(canvasCreated);
  t.true(shapeFilled);
  t.true(strokeMade);
  revert();
  t.end();
});
