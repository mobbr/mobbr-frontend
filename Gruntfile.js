'use strict';

module.exports = function (grunt) {
    grunt.env = grunt.option('env') || 'test';
    require('load-grunt-config')(grunt, {
        config: {
            yeoman: {
                app: 'app',
                dist: 'dist'
            }
        }
    });
    grunt.renameTask('regarde', 'watch');
};
