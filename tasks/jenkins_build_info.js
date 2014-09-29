/*
 * grunt-jenkins-build-info
 * https://github.com/linuxbozo/grunt-jenkins-build-info
 *
 * Copyright (c) 2014 M. Adam Kendall
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerTask('jenkins_build_info', 'Adds Jenkins build information, including source control info,  to defined json (package, bower, etc)', function () {

    console.log('loading options');
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      svnRevision: process.env.SVN_REVISION || null,
      gitRevision: process.env.GIT_COMMIT || null,
      gitBranch: process.env.GIT_BRANCH || null,
      jenkinsBuild: process.env.BUILD_NUMBER || "Local Build",
      files: []
    });

    // Iterate over all specified file groups.
    options.files.forEach(function (file, idx) {
      if (!grunt.file.exists(file)) {
        grunt.log.warn('Source file "' + file + '" not found.');
        return false;
      }
      var src = grunt.file.readJSON(file);

      src.build = {};
      src.build.number = options.jenkinsBuild;

      if (options.svnRevision !== null) {
        src.build.svnRevision = options.svnRevision;
      }
      if (options.gitRevision !== null) {
        src.build.gitRevision = options.gitRevision;
      }
      if (options.gitBranch !== null) {
        src.build.gitBranch = options.gitBranch;
      }

      grunt.file.write(file, JSON.stringify(src, null, 2));

    });


    // Print a success message.
    grunt.log.writeln('Build information updated.');
  });

};
