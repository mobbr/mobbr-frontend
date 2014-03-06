module.exports = function(grunt) {
    grunt.registerTask('e2e', [
        'clean:server',
        'livereload-start',
        'connect:livereload',
        'karma:e2e'
    ]);
}