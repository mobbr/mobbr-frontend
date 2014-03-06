'use strict';

module.exports = function (grunt) {
    require('load-grunt-config')(grunt, {
        config: {
            yeoman: {
                app: 'app',
                dist: 'dist'
            },
            env: grunt.option('env') || 'dev'
        }
    });
};
