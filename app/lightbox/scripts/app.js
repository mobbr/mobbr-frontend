'use strict';

angular.module('mobbr.controllers', []);

angular.module('mobbr', [

        'mobbr.controllers',
        'mobbr.services.msg',
        'mobbr.services.Gateway',
        'mobbr.services.mbr-api',
        'mobbr.services.storage',
        'mobbr.services.user'

    ]).run([

        '$http',
        '$window',
        'userSession',
        '$localStorage',
        function ($http, $window, userSession, $localStorage) {

            // TODO: move this to usersession, it's prettier

            /*var authorization = $localStorage.authorization;

            if(authorization !== null && authorization != undefined){
                // if we are in an iframe we let our parent know we are logged in
                if ($window.parent && $window.parent.postMessage) {
                    $window.parent.postMessage([ userSession.user.username, userSession.user.email ].join('|'), '*');
                }
            } else {
                if ($window.parent && $window.parent.postMessage) {
                    $window.parent.postMessage('logout', '*');
                }
            }*/
        }
    ]
);
