var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
    mountFolder = function (connect, dir) {
        return connect.static(require('path').resolve(dir));
    }, yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

try {
    yeomanConfig.app = require('./component.json').appPath || yeomanConfig.app;
} catch (e) {}

module.exports = {
    options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0'
    },
    livereload: {
        options: {
            middleware: function (connect) {
                return [
                    lrSnippet,
                    mountFolder(connect, '.tmp'),
                    mountFolder(connect, yeomanConfig.app)
                ];
            }
        }
    },
    test: {
        options: {
            middleware: function (connect) {
                return [
                    mountFolder(connect, '.tmp'),
                    mountFolder(connect, 'test')
                ];
            }
        }
    }
};