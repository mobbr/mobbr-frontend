'use strict';

angular.module('mobbr.controllers', []);

angular.module('mobbr', [
        'mobbr.controllers',
        'mobbr.services.msg',
        'mobbr.services.mbr-api',
        'mobbr.services.storage',
        'mobbr.services.user'
    ]
);