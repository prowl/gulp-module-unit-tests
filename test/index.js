'use strict';

var should = require('should'); //jshint ignore:line
var path = require('path');
var rimraf = require('rimraf');

var unitTests = require('../lib/index');

var gulpMock = {};
var task = null;

gulpMock.task = function(name, deps, func) {
  task = func;
};

var configMock = {
  root: __dirname,
  soften: ['**/*.js', '**/*.json', '!./node_modules/**', '!./docs/**'],
  src: ['**/*.js', '!./node_modules/**', '!./docs/**'],
  specs: ['specs/**/*.js'],
  statements_threshold: 90,
  functions_threshold: 100,
  branches_threshold: 100,
  lines_threshold: 80
};

unitTests(gulpMock, configMock);

describe('Gulp Module Unit Tests', function() {
  it('Should return a function', function() {
    task.should.be.type('function');
  });

  it('Should create a docs directory', function() {
    task();
  });

  it('Should remove the directory', function(cb) {
    this.timeout(6000);
    setTimeout(function() {
      rimraf(path.resolve(__dirname, 'docs'), cb);
    }, 5000);
  });
});
