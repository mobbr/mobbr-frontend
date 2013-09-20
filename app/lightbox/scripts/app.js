'use strict';

angular.module('mobbr.controllers', []);

angular.module('mobbr', [

        'mobbr.controllers',
        'mobbr.services.Gateway',
        'mobbr.services.mbr-api',
        'mobbr.services.user',
        'LocalStorageModule'

    ]).config([ '$httpProvider', function ($httpProvider, Msg) {

        $httpProvider.responseInterceptors.push(function($q, $timeout, userSession, Msg) {

            var timer;

            return function (promise) {
                $timeout.cancel(timer);
                timer = $timeout(function () {
                    if (userSession.authenticated) {
                        userSession.doLogout(true);
                    }
                }, 1000 * 60 * 15);
                return promise;
            }
        });

    }]).factory('Msg',function () {

        var Msg = {
            addWarning: function (msg) {
                this.message(arguments, 'warning');
            },
            addError: function () {
                this.message(arguments, 'error');
            },
            addNotification: function () {
                this.message(arguments, 'info');
            },
            setResponseMessage: function (level, title, response) {
                var messageText = null;
                if (response != null) {
                    if (response.message != undefined && response.message != null) {
                        if (response.message.text != null && response.message.text != undefined && response.message.text != '') {
                            messageText = response.message.text;
                        }
                        if (response.message.type != null && response.message.type != undefined && response.message.type != '') {
                            level = response.message.type;
                        }
                    } else if (response.data != undefined && response.data != null && response.data.message != null) {
                        if (response.data.message.text != null && response.data.message.text != undefined && response.data.message.text != '') {
                            messageText = response.data.message.text;
                        }
                        if (response.data.message.type != undefined && response.data.message.type != null && response.data.message.type != '') {
                            level = response.data.message.type;
                        }
                    }
                }

                this.message([title, messageText], level);
            },
            message: function (args, level) {
                // internal, use add methods
                var title, message;
                if (args.length == 2 && args[1] != null && args[1] != undefined) {
                    title = args[0];
                    message = args[1];
                } else {
                    title = level;
                    message = args[0];
                }
                $.pnotify({
                    title: title,
                    text: message,
                    type: level
                });
            }

        }


        return Msg;
    }).run([ 'localStorageService','$http', '$window', 'userSession', function (localStorageService, $http, $window, userSession) {

        // TODO: move this to usersession, it's prettier

        var authorization = localStorageService.get('Authorization');
        if(authorization !== null && authorization != undefined){
            userSession.authenticated = true;
            userSession.user = localStorageService.get('User');

            $http.defaults.headers.common['Authorization'] = authorization;
            // if we are in an iframe we let our parent know we are logged in
            if ($window.parent && $window.parent.postMessage) {
                console.log(userSession.user);
                $window.parent.postMessage([ userSession.user.username, userSession.user.email ].join('|'), '*');
            }
        }
    }]);

var keyStr = "ABCDEFGHIJKLMNOP" +
    "QRSTUVWXYZabcdef" +
    "ghijklmnopqrstuv" +
    "wxyz0123456789+/" +
    "=";

function encode64(input) {
    var output = "",
        chr1, chr2, chr3 = "",
        enc1, enc2, enc3, enc4 = "",
        i = 0;

    while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }

        output = output +
            keyStr.charAt(enc1) +
            keyStr.charAt(enc2) +
            keyStr.charAt(enc3) +
            keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    }

    return output;
};

function decode64(input) {
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;

    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
    var base64test = /[^A-Za-z0-9\+\/\=]/g;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    do {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }

        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";

    } while (i < input.length);

    return unescape(output);
}

