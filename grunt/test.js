module.exports = function(grunt) {
    grunt.registerTask('server', [
        'clean:server',
        'coffee:dist',
        'compass:server',
        'livereload-start',
        'connect:livereload',
        'open',
        'watch'
    ]);
}
