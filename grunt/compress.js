module.exports = {
    main: {
        options: {
            mode: 'tgz',
            archive: 'dist.tar.gz'
        },
        files: [
            {
                src: 'dist/**'
            }
        ]
    }
};
