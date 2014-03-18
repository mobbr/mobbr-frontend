module.exports = {
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
};
