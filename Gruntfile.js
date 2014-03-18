'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Environment to be passed in via command line: grunt build --env=dev | test | prod>
  var env = grunt.option('env') || 'test';

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  try {
    yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
  } catch (e) {
  }

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
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
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      },
      e2e: {
        configFile: 'karma-e2e.conf.js'
      }
    },
    concat: {
      options: {
        separator: ';'
      },
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
      html: [ '<%= yeoman.app %>/index.html'],
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
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.app %>/img',
            src: '{,*/}*.{png,jpg,jpeg}',
            dest: '<%= yeoman.dist %>/img'
          }
        ]
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
    ngtemplates: {
      dist: {
        src: [ '<%= yeoman.app %>/views/*.html', '<%= yeoman.app %>/directives/*.html'],
        dest: '<%= yeoman.dist %>/scripts/templates.js',
        options: {
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
      },
      server: {
        src: [ '<%= yeoman.app %>/views/*.html', '<%= yeoman.app %>/directives/*.html'],
        dest: '<%= yeoman.app %>/scripts/templates.js',
        options: {
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
            cwd: '<%= yeoman.dist %>/scripts',
            src: '*.js',
            dest: '<%= yeoman.dist %>/scripts'
          }
        ]
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
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 8
      },
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
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>',
            dest: '<%= yeoman.dist %>',
            src: [
              '*.{ico,txt,js}',
              '.htaccess'
            ]
          }
        ]
      }
    },
    compress: {
      main: {
        options: {
          mode: 'tgz',
          archive: 'dist-' + env + '.tar.gz'
        },
        files: [
          {src: 'dist/**'}
        ]
      }
    },
    ngconstant: {
      test: [
        {
          dest: 'dist/scripts/config.js',
          name: 'mobbr.config',
          wrap: '(function() { \n return <%= __ngModule %> \n\n})();',
          constants: {
            'apiUrl': 'https://test-api.mobbr.com',
            'environment': 'test'
          }
        }
      ],
      prod: [
        {
          dest: 'dist/scripts/config.js',
          name: 'mobbr.config',
          wrap: '(function() { \n return <%= __ngModule %> \n\n})();',
          constants: {
            'apiUrl': 'https://api.mobbr.com',
            'environment': 'production'
          }
        }
      ]
    },
    sshconfig: {
      testhost: {
        host: 'test-www.mobbr.com',
        username: 'keesdekooter',
//        privateKey: grunt.file.read('/Users/kees/.ssh/id_rsa'),
        agent: process.env.SSH_AUTH_SOCK,
        showProgress: true
      }
    },
    sftp: {
      copytar: {
        files: {
          "./": ['dist-' + env + '.tar.gz']
        },
        options: {
          path: '/tmp/',
          config: 'testhost'
        }
      }
    },
    sshexec: {
      deploy: {
        command: [
          'cd /tmp',
          'tar -xzf dist-' + env + '.tar.gz'
        ].join(' && '),
        options: {
          config: 'testhost'
        }
      },
      move: {},
      setpermissions: {}
    }
  });

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('server', [
    'clean:server',
    'coffee:dist',
//    'compass:server',
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
    'bower-install-simple',
//    'compass:dist',
    // 'config',
    'useminPrepare',
    'imagemin',
    'cssmin:dist',
    'ngconstant:' + env,
    'concat',
    'htmlmin',
//    'ngtemplates',
    'copy',
    'ngmin',
//    'uglify',
    'rev',
    'usemin',
    'compress'
  ]);

  grunt.registerTask('deploy', [
//    'build',
    'sftp:copytar',
    'sshexec:deploy'
  ]);

  grunt.registerTask('default', ['build']);

  grunt.registerTask('e2e', [
    'clean:server',
    'livereload-start',
    'connect:livereload',
    'karma:e2e'
  ]);
};
