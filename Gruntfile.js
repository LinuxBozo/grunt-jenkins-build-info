/*
 * grunt-jenkins-build-info
 * https://github.com/linuxbozo/grunt-jenkins-build-info
 *
 * Copyright (c) 2014 M. Adam Kendall
 * Licensed under the MIT license.
 */

'use strict';

process.env.BUILD_NUMBER = process.env.BUILD_NUMBER ? process.env.BUILD_NUMBER : "foo";
process.env.BUILD_TAG = process.env.BUILD_TAG ? process.env.BUILD_TAG : "tag";
process.env.JOB_URL = process.env.JOB_URL ? process.env.JOB_URL : "http://example.org";
process.env.SVN_REVISION = process.env.SVN_REVISION ? process.env.SVN_REVISION : "bar";
process.env.GIT_COMMIT = process.env.GIT_COMMIT ? process.env.GIT_COMMIT : "baz";
process.env.GIT_BRANCH = process.env.GIT_BRANCH ? process.env.GIT_BRANCH : "develop";

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

    copy: {
      tests: {
        files: [{expand: true, flatten:true, src: ['test/actual/*'], dest: 'tmp/', filter: 'isFile'},]
      }
    },


    // Configuration to be run (and then tested).
    jenkins_build_info: {
      main: {
        options: {
          files: ['tmp/test.json']
        },
      },
      custom: {
        options: {
          files: ['tmp/test_custom.json'],
          buildField: 'buildInfo'
        }
      }
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
  grunt.registerTask('test', ['clean', 'copy', 'jenkins_build_info:main', 'jenkins_build_info:custom', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
