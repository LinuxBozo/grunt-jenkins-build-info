/*
 * grunt-jenkins-build-info
 * https://github.com/linuxbozo/grunt-jenkins-build-info
 *
 * Copyright (c) 2014 M. Adam Kendall
 * Licensed under the MIT license.
 */

'use strict';

process.env.BUILD_NUMBER = "foo";
process.env.SVN_REVISION = "bar";
process.env.GIT_COMMIT = "baz";
process.env.GIT_BRANCH = "develop";

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },


    // Configuration to be run (and then tested).
    jenkins_build_info: {
      options: {
        files: ['test/actual/test.json']
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'jenkins_build_info', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
