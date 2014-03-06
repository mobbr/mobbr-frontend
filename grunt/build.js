module.exports = function(grunt) {

    grunt.registerTask('build', [
        'clean:dist',
        'compass:dist',
        //'config',
        'useminPrepare',
        'imagemin',
        'cssmin:dist',
        'ngconstant:' + grunt.env,
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
