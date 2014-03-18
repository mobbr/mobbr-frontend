module.exports = {
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
};
