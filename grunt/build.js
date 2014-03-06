module.exports = function(grunt) {
    grunt.registerTask('build', [
        'clean:dist',
        'compass:dist',
        'useminPrepare',
        'imagemin',
        'cssmin:dist',
        'htmlmin',
        'ngtemplates',
        'concat:dist',
        'copy',
        'ngmin',
        'uglify',
        'rev',
        'usemin',
        'compress'
    ]);
    grunt.registerTask('default', ['build']);
}
