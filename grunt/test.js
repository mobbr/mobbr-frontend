module.exports = function(grunt) {
    grunt.registerTask('test', [
        'clean:server',
        'coffee',
        'compass',
        'connect:test',
        'karma'
    ]);
}
