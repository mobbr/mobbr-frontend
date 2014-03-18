module.exports = {
    dist: {
        src: [ '<%= yeoman.app %>/views/*.html', '<%= yeoman.app %>/directives/*.html'],
        dest: '.tmp/scripts/templates.js',
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
        dest: '.tmp/scripts/templates.js',
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
};
