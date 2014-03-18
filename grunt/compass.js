module.exports = {
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
};