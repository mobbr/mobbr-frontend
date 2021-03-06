'use strict';
var moment = require('moment');
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Environment to be passed in via command line: grunt build --env=dev | test | stage | production>
    var env = grunt.option('env') || 'test';

    var site;

    if (env === 'test') {
        site = 'test-www.mobbr.com';
    } else if (env === 'stage') {
        site = 'stage-www.mobbr.com';
    } else if (env === 'dev') {
        site = 'api.mobbr.dev';
    } else {
        site = "www.mobbr.com";
    }
    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    var version = moment().format('YYYYMMDDHHmm');

    try {
        yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
    } catch (e) {
    }

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            all: {
                files: [
                    '{.tmp,<%= yeoman.app %>}/{,*/}*.html',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js'
                ],
                tasks: [ ],
                options: {
                    livereload: 35728
                }
            },
            css: {
                files: [
                    '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.scss'
                ],
                tasks: [ 'compass:server' ]
            }
        },
        connect: {
            all: {
                options: {
                    port: 9001,
                    hostname: '0.0.0.0',
                    livereload: 35728,
                    base: 'app'
                }
            },
            test: {
                options: {
                    port: 9001,
                    hostname: '0.0.0.0',
                    livereload: 35728,
                    base: ['.tmp','app']
                }
            }
        },
        open: {
            all: {
                url: 'http://mobbr.dev:<%= connect.all.options.port %>/'
            }
        },
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= yeoman.dist %>/*',
                            '!<%= yeoman.dist %>/.git*'
                        ]
                    }
                ]
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
        concat: {
            options: {
                separator: ';'
            }
        },
        useminPrepare: {
            html: [ '<%= yeoman.app %>/index.html'],
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: [
                '<%= yeoman.dist %>/styles/{,*/}*.css'
            ],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/img',
                        src: '{,*/}*.{png,jpg,jpeg,gif}',
                        dest: '<%= yeoman.dist %>/img'
                    }
                ]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/style.css': [
                        '.tmp/styles/style.css'
                    ]
                }
            }
        },
        ngtemplates: {
            dist: {
                src: [ '<%= yeoman.app %>/views/*.html', '<%= yeoman.app %>/views/directives/*.html', '<%= yeoman.app %>/views/partials/*.html'],
                dest: '.tmp/templates.js',
                options: {
                    url: function(url) { return url.replace('app/', ''); },
                    usemin: '<%= yeoman.dist %>/scripts/mobbr-www.js',
                    module: 'mobbr',
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true, // Only if you don't use comment directives!
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: false,
                    collapseBooleanAttributes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeOptionalTags: false
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>',
                        src: ['index.html'],
                        dest: '<%= yeoman.dist %>'
                    }
                ]
            }
        },
        ngmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/concat/scripts',
                        src: '{,*/}*.js',
                        dest: '.tmp/concat/scripts'
                    }
                ]
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            dist: {}
        },
        rev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8
            },
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css'
                    ]
                }
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
                    cssDir: '.tmp/styles'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            '*.{ico,txt,js}',
                            '.htaccess',
                            'fonts/*.*',
                            'popup.html'
                        ]
                    }
                ]
            },
            all :{
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '.tmp',
                        src: [
                            'index.html',
                            'popup.html'
                        ]
                    }
                ]
            }
        },
        compress: {
            main: {
                options: {
                    mode: 'tgz',
                    archive: 'dist-' + env + '-' + version + '.tar.gz'
                },
                files: [
                    {src: 'dist/**'}
                ]
            }
        },
        ngconstant: {
            test: [
                {
                    dest: '<%= yeoman.app %>/scripts/config.js',
                    name: 'mobbr.config',
                    wrap: '(function() { \n return <%= __ngModule %> \n\n})();',
                    constants: {
                        lightboxUrl: 'https://test-www.mobbr.com/lightbox/#',
                        uiUrl: 'https://test-www.mobbr.com',
                        apiUrl: 'https://test-api.mobbr.com',
                        environment: 'test'
                    }
                }
            ],
            stage: [
                {
                    dest: '<%= yeoman.app %>/scripts/config.js',
                    name: 'mobbr.config',
                    wrap: '(function() { \n return <%= __ngModule %> \n\n})();',
                    constants: {
                        lightboxUrl: 'https://stage-www.mobbr.com/lightbox/#',
                        uiUrl: 'https://stage-www.mobbr.com',
                        apiUrl: 'https://stage-api.mobbr.com',
                        environment: 'stage'
                    }
                }
            ],
            production: [
                {
                    dest: '<%= yeoman.app %>/scripts/config.js',
                    name: 'mobbr.config',
                    wrap: '(function() { \n return <%= __ngModule %> \n\n})();',
                    constants: {
                        lightboxUrl: 'https://mobbr.com/lightbox/#',
                        uiUrl: 'https://mobbr.com',
                        apiUrl: 'https://api.mobbr.com',
                        environment: 'production'
                    }
                }
            ],
            dev: [
                {
                    dest: '<%= yeoman.app %>/scripts/config.js',
                    name: 'mobbr.config',
                    wrap: '(function() { \n return <%= __ngModule %> \n\n})();',
                    constants: {
                        'lightboxUrl': 'http://mobbr.dev:9000/#',
                        'uiUrl': 'http://mobbr.dev:9001',
                        'apiUrl': 'http://api.mobbr.dev',
                        'environment': 'development'
                    }
                }
            ]
        },
        sshconfig: {
            test: {
                host: 'test-www.mobbr.com',
                agent: process.env.SSH_AUTH_SOCK,
                showProgress: true
            },
            production: {
                host: 'mobbr.com',
                agent: process.env.SSH_AUTH_SOCK,
                showProgress: true
            },
            stage: {
                host: 'stage-www.mobbr.com',
                agent: process.env.SSH_AUTH_SOCK,
                showProgress: true
            }
        },
        sftp: {
            copytar: {
                files: {
                    "./": ['dist-' + env + '-' + version + '.tar.gz']
                },
                options: {
                    path: '/tmp/',
                    config: env
                }
            }
        },
        sshexec: {
            deploy: {
                command: [
                    'cd /tmp',
                    'rm -Rf dist/',
                    'tar -xzf dist-' + env + '-' + version + '.tar.gz',
                    'mkdir /var/www/' + env  + '-www-' + version,
                    'cp -R dist/* /var/www/' + env  + '-www-' + version,
                    'cd /var/www/',
                    //'chgrp -R www-data ' + 'www-' + env  + '-' + version,
                    'rm -f ' + site,
                    'ln -s ' + env  + '-www-' + version + ' ' + site
                    //'chgrp -h www-data ' + site
                ].join(' && '),
                options: {
                    config: env
                }
            }
        },
        processhtml: {
            options: {
                process: true,
                data: {
                    title: 'processhtml',
                    message: 'Cleaning up test html'
                }
            },
            dist: {
                files: {
                    '<%= yeoman.dist %>/index.html': ['<%= yeoman.dist %>/index.html']
                }
            },
            server: {
                files: {
                    '.tmp/index.html': ['.tmp/index.html']
                }
            }

        }
    });

    grunt.registerTask('server', [
        'clean:server',
        'bower-install-simple',
        'compass:server',
        'ngconstant:' + env,
        'copy',
        'processhtml',
        'connect:test',
        'open',
        'watch'
    ]);

    grunt.registerTask('servemocked', [
        'clean:server',
        'bower-install-simple',
        'compass:server',
        'ngconstant:' + env,
        'copy',
        'connect:all',
        'open',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'bower-install-simple',
        'compass:dist',
        'useminPrepare',
        'ngtemplates',
        'imagemin',
        'cssmin:dist',
        'ngconstant:' + env,
        'concat',
        'copy',
        'ngmin',
        'uglify',
        'rev',
        'htmlmin',
        'usemin',
        'processhtml',
        'compress'
    ]);

    grunt.registerTask('deploy', [
        'build',
        'sftp:copytar',
        'sshexec:deploy'
    ]);

    grunt.registerTask('default', ['build']);
};