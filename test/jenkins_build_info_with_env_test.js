'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.jenkins_build_info = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  with_env: function (test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/test.json');
    var expected = grunt.file.read('test/expected/test_default.json');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
  },
  with_custom: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/test_custom.json');
    var expected = grunt.file.read('test/expected/test_custom.json');
    test.equal(actual, expected, 'should describe what the custom field behavior is.');

    test.done();
  }

};
