'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    try {
        yeomanConfig.app = require('./component.json').appPath || yeomanConfig.app;
    } catch (e) {}

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            coffee: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                files: ['test/spec/{,*/}*.coffee'],
                tasks: ['coffee:test']
            },
            compass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass']
            },
            livereload: {
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ],
                tasks: ['livereload']
            }
        },
        connect: {
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
        },
        open: {
            server: {
                url: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js'
            ]
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            },
            e2e: {
                configFile: 'karma-e2e.conf.js'
            }
        },
        coffee: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/scripts',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/scripts',
                    ext: '.js'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'test/spec',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/spec',
                    ext: '.js'
                }]
            }
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '<%= yeoman.app %>/styles',
                imagesDir: '<%= yeoman.app %>/img',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                importPath: '<%= yeoman.app %>/styles',
                relativeAssets: true
            },
            dist: {
                options: {
                    cssDir:'.tmp/styles'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        concat: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/scripts/combined-head.js': [
                        '<%= yeoman.app %>/components/modernizr/modernizr.js'
                    ],
                    '<%= yeoman.dist %>/scripts/combined-ie.js': [
                        '<%= yeoman.app %>/components/es5-shim/es5-shim.js',
                        '<%= yeoman.app %>/components/json3/lib/json3.js'
                    ],
                    '<%= yeoman.dist %>/scripts/combined.js': [
                        '<%= yeoman.app %>/components/base64/base64.js',
                        '<%= yeoman.app %>/components/jquery/jquery.js',
                        '<%= yeoman.app %>/components/angular/angular.js',
                        '<%= yeoman.app %>/components/angular-cookies/angular-cookies.js',
                        '<%= yeoman.app %>/components/angular-resource/angular-resource.js',
                        '<%= yeoman.app %>/components/angular-bootstrap/ui-bootstrap-tpls.js',
                        '<%= yeoman.app %>/components/pines-notify/jquery.pnotify.js',
                        '<%= yeoman.app %>/components/js-md5/js/md5.js',
                        '<%= yeoman.app %>/components/ngstorage/ngStorage.js'
                    ],
                    '<%= yeoman.dist %>/scripts/mobbr-core.js': [
                        '<%= yeoman.app %>/scripts/services{,*/}*.js'
                    ],
                    '<%= yeoman.dist %>/scripts/mobbr-www.js': [
                        '<%= ngtemplates.dist.dest %>',
                        '<%= yeoman.app %>/scripts/controllers{,*/}*.js',
                        '<%= yeoman.app %>/scripts/directives.js',
                        '<%= yeoman.app %>/scripts/app.js'
                    ],
                    '<%= yeoman.dist %>/scripts/mobbr-lightbox.js': [
                        '<%= yeoman.app %>/lightbox/scripts/controllers{,*/}*.js',
                        '<%= yeoman.app %>/lightbox/scripts/services{,*/}*.js',
                        '<%= yeoman.app %>/lightbox/scripts/app.js'
                    ]
                }
            }
        },
        useminPrepare: {
            html: [ '<%= yeoman.app %>/index.html', '<%= yeoman.app %>/lightbox/index.html' ],
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: [
                '<%= yeoman.dist %>/styles/{,*/}*.css',
                '<%= yeoman.app %>/components/pines-notify/jquery.pnotify.default.css'
            ],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/img',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/img'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/style.css': [
                        '<%= yeoman.app %>/styles/style.css',
                        '<%= yeoman.app %>/components/pines-notify/jquery.pnotify.default.css'
                    ],
                    '<%= yeoman.dist %>/styles/style-lightbox.css': [
                        '<%= yeoman.app %>/styles/style-lightbox.css',
                        '<%= yeoman.app %>/components/pines-notify/jquery.pnotify.default.css'
                    ]
                }
            }
        },
      // TODO: should not be generated in a source folder
        ngtemplates: {
            dist: {
                src:      [ '<%= yeoman.app %>/views/*.html', '<%= yeoman.app %>/directives/*.html'],
                dest:     '<%= yeoman.app %>/scripts/templates.js',
                options: {
                    htmlmin: {
                        collapseBooleanAttributes:      true,
                        collapseWhitespace:             true,
                        removeAttributeQuotes:          true,
                        removeComments:                 true, // Only if you don't use comment directives!
                        removeEmptyAttributes:          true,
                        removeRedundantAttributes:      true,
                        removeScriptTypeAttributes:     true,
                        removeStyleLinkTypeAttributes:  true
                    }
                }
            },
            server: {
                src:      [ '<%= yeoman.app %>/views/*.html', '<%= yeoman.app %>/directives/*.html'],
                dest:     '<%= yeoman.app %>/scripts/templates.js',
                options: {
                    htmlmin: {
                        collapseBooleanAttributes:      true,
                        collapseWhitespace:             true,
                        removeAttributeQuotes:          true,
                        removeComments:                 true, // Only if you don't use comment directives!
                        removeEmptyAttributes:          true,
                        removeRedundantAttributes:      true,
                        removeScriptTypeAttributes:     true,
                        removeStyleLinkTypeAttributes:  true
                    }
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                      removeCommentsFromCDATA: true,
                     collapseBooleanAttributes: true,
                     removeAttributeQuotes: true,
                     removeRedundantAttributes: true,
                     useShortDoctype: true,
                     removeEmptyAttributes: true,
                     removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: ['index.html'/*, 'lightbox/index.html'*/],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>/scripts',
                    src: '*.js',
                    dest: '<%= yeoman.dist %>/scripts'
                }]
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/scripts/mobbr-www.js': [
                        '<%= yeoman.dist %>/scripts/mobbr-www.js'
                    ],
                    '<%= yeoman.dist %>/scripts/mobbr-core.js': [
                        '<%= yeoman.dist %>/scripts/mobbr-core.js'
                    ],
                    '<%= yeoman.dist %>/scripts/mobbr-lightbox.js': [
                        '<%= yeoman.dist %>/scripts/mobbr-lightbox.js'
                    ]
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                    ]
                }
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt,js}',
                        '.htaccess'
                    ]
                }]
            }
        }
    });

    grunt.renameTask('regarde', 'watch');

    grunt.registerTask('server', [
        'clean:server',
        'coffee:dist',
        'compass:server',
        'livereload-start',
        'connect:livereload',
        'open',
        'watch'
    ]);

    grunt.registerTask('test', [
        'clean:server',
        'coffee',
        'compass',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'compass:dist',
        'useminPrepare',
        'imagemin',
        'cssmin:dist',
        'htmlmin',
        'ngtemplates',
        'concat:dist',
        'copy',
        'ngmin',
        'uglify',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', ['build']);

    grunt.registerTask('e2e', [
        'clean:server',
        'livereload-start',
        'connect:livereload',
        'karma:e2e'
    ]);
};
