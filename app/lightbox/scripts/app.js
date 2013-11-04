'use strict';

angular.module('mobbr.controllers', []);
angular.module('mobbr.directives', []);

angular.module('mobbr-lightbox', [
        'ui.bootstrap',
        'mobbr.directives',
        'mobbr.controllers',
        'mobbr.services.msg',
        'mobbr.services.mbr-api',
        'mobbr.services.storage',
        'mobbr.services.user'
    ]
);