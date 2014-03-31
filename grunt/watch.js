module.exports = {
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
};