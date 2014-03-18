module.exports = {
    dist: {
        files: {
            '<%= yeoman.dist %>/styles/style.css': [
                '<%= yeoman.app %>/styles/style.css',
                '<%= yeoman.app %>/components/pines-notify/jquery.pnotify.default.css'
            ],
            '<%= yeoman.dist %>/styles/style-lightbox.css': [
                '<%= yeoman.app %>/styles/style-lightbox.css',
                '<%= yeoman.app %>/components/pines-notify/jquery.pnotify.default.css'
            ]
        }
    }
}