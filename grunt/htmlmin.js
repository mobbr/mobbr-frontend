module.exports = {
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
        files: [
            {
                expand: true,
                cwd: '<%= yeoman.app %>',
                src: ['index.html', 'lightbox/index.html'],
                dest: '<%= yeoman.dist %>'
            }
        ]
    }
};