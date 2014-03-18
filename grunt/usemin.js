module.exports = {
    html: ['<%= yeoman.dist %>/{,*/}*.html'],
    css: [
        '<%= yeoman.dist %>/styles/{,*/}*.css',
        '<%= yeoman.app %>/components/pines-notify/jquery.pnotify.default.css'
    ],
    options: {
        dirs: ['<%= yeoman.dist %>']
    }
};
