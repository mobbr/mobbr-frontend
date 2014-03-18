module.exports = {
    test: [
        {
            dest: 'dist/scripts/config.js',
            name: 'mobbr.config',
            wrap: '(function() { \n return <%= __ngModule %> \n\n})();',
            constants: {
                'apiUrl': 'https://test-api.mobbr.com',
                'environment': 'test'
            }
        }
    ],
    prod: [
        {
            dest: 'dist/scripts/config.js',
            name: 'mobbr.config',
            wrap: '(function() { \n return <%= __ngModule %> \n\n})();',
            constants: {
                'apiUrl': 'https://api.mobbr.com',
                'environment': 'production'
            }
        }
    ]
};
