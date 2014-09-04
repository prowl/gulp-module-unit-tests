'use strict';

var exec = require('child_process').exec;
var path = require('path');

// save a local reference to our parameters
var gulp = null;
var config = null;
var completed = null;

/**
 * Adds the unit tests task to the gulp instance
 *
 * @param {Object} gulpRef The instance to attach the task to
 * @param {Object} conf The configuration options
 */
function unitTestsSetup(gulpRef, conf) {
  gulp = gulpRef;
  config = conf;

  gulp.task('unit', false, unitTestsTask);
}

/**
 * Runs the unit tests and code coverage checks
 */
function unitTestsTask(done) {
  completed = done;

  var istanbulPath = path.resolve(__dirname, '../node_modules/.bin/istanbul');
  var mochaPath = path.resolve(__dirname, '../node_modules/mocha/bin/_mocha');
  var outputDir = path.resolve(config.root, 'docs/coverage');

  var cmd = istanbulPath;
  cmd += ' cover';
  cmd += ' --dir ' + outputDir;
  cmd += ' -x "**/docs/**"';
  cmd += ' ' + mochaPath;
  cmd += ' -- --harmony';

  exec(cmd, execCallback);
}

/**
 * Handles the output recieved from the execute command
 *
 * @param {Object} err Any error that occured while executing the command
 * @param {Buffer} stdout The stdout given back by the executable
 * @param {Buffer} stderr The stderr given back by the executable
 */
function execCallback(err, stdout, stderr) {
  console.log(stdout);
  console.error(stderr);

  completed(err);
}

module.exports = unitTestsSetup;
