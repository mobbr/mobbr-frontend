'use strict';

angular.module('mobbr.controllers', []);

angular.module('mobbr', [

        'ui.bootstrap',
        'mobbr.controllers',
        'mobbr.services.mbr-api',
        'mobbr.services.user',
        'mobbr.directives',
        'ngCookies',
        'LocalStorageModule'

    ]).config([ '$routeProvider', function ($routeProvider) {

        $routeProvider.when('/', {

            templateUrl: 'views/main.html',
            controller: 'MainController',
            //authsettings:{ authenticated: false, redirectTo: '/dashboard' },
            //resolve: {
            //    authResolver: [ 'userSession', function (userSession) { return userSession.authenticate(); } ]
            //}

        }).when('/main_new', {
                templateUrl: 'views/main_new.html'
            }).when('/login/:hash', {
                templateUrl: 'views/link-login.html',
                controller: 'LinkLoginController'
            }).when('/activate/:hash', {
                templateUrl: 'views/activate.html',
                controller: 'ActivateController'
            }).when('/email/:hash', {
                templateUrl: 'views/update-email.html',
                controller: 'UpdateEmailController'
            }).when('/recover', {
                templateUrl: 'views/recover-password.html',
                controller: 'ResetPasswordController'
            }).when('/join', {
                templateUrl: 'views/join.html',
                authsettings: { authenticated: false, redirectTo: '/dashboard' }
                ,
                resolve: {
                    authResolver: [ 'userSession', function (userSession) {
                        return userSession.authenticate();
                    } ]
                }
            }).when('/settings', {
                templateUrl: 'views/settings.html',
                authsettings: { authenticated: true, redirectTo: '/login' },
                resolve: {
                    authResolver: [ 'userSession', function (userSession) {
                        return userSession.authenticate();
                    } ]
                },
                controller: 'UserSettingsController'
            }).when('/dashboard', {
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardController',
                authsettings: { authenticated: true, redirectTo: '/login' },
                resolve: {
                    authResolver: [ 'userSession', function (userSession) {
                        return userSession.authenticate();
                    } ]
                }

            }).when('/domain/:url', {
                templateUrl: 'views/domain.html',
                controller: 'DomainController'
            }).when('/claimpayment', {

                templateUrl: 'views/claim_payment.html',
                controller: 'ClaimPaymentController'


            }).when('/generatebutton', {

                templateUrl: 'views/generate_button.html',
                controller: 'CreateButtonController'


            }).when('/exchangerate', {

                templateUrl: 'views/exchangerate.html',
                controller: 'ExchangerateController'

            }).when('/buttons', {

                templateUrl: 'views/buttons.html'

            }).when('/api', {

                templateUrl: 'views/api.html'


            }).when('/usecases', {

                templateUrl: 'views/usecases.html'


            }).when('/siteconnector', {

                templateUrl: 'views/siteconnector.html'


            }).when('/consumers', {

                templateUrl: 'views/consumers.html'


            }).when('/webmasters', {

                templateUrl: 'views/webmasters.html'

            }).when('/creators', {

                templateUrl: 'views/creators.html'

            }).when('/company', {

                templateUrl: 'views/company.html'

            }).when('/partnering', {

                templateUrl: 'views/partnering.html'

            }).when('/validator', {

                templateUrl: 'views/validator.html'


            }).when('/payment/:id', {
                templateUrl: 'views/payment.html',
                controller: 'PaymentReceiptController'

            }).when('/url/:url', {

                templateUrl: 'views/url.html',
                controller: 'UrlReceiptController'

            }).otherwise({ redirectTo: '/' });

    }]).config([ '$locationProvider', function ($locationProvider) {
        // TODO: every request that is no api request should be rewritten on the server to the base index.html
        // TODO: angular app should be placed in the root to make this work

        //$locationProvider.html5Mode(true);
        //$locationProvider.hashPrefix = '!';

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
    }).run([ 'localStorageService','$http','$rootScope', 'Util', '$location', 'userSession', 'Msg', '$window', '$anchorScroll', '$routeParams', function (localStorageService,$http,$rootScope, Util, $location, userSession, Msg, $window, $anchorScroll, $routeParams) {

        var authorization = localStorageService.get('Authorization');
        if(authorization !== null && authorization != undefined){
            userSession.authenticated = true;
            userSession.user = localStorageService.get('User');

            $http.defaults.headers.common['Authorization'] = authorization;
        }

        $rootScope.$on('$routeChangeSuccess', function (newRoute, oldRoute) {
            $location.hash($routeParams.scrollTo);
            $anchorScroll();
        });

        $rootScope.currenciesMap = {};
        Util.currencies(function (response) {
            if (response.result != null) {
                $rootScope.currenciesMap = response.result;
            } else if (response.message != null) {
                console.log('error loading currencies' + response.error.status);
            }
            $rootScope.currenciesMap['MBR'] = 'Mobbr';
        });

        $rootScope.currencyDescription = function (iso) {
            var currency = $rootScope.currenciesMap[iso];
            if (!currency || 0 === currency.length) {
                return iso;
            }
            return currency;
        }

        Util.languages(function (response) {
            if (response.result != null) {
                $rootScope.languagesMap = response.result;
                $rootScope.languagesMap[''] = 'No language';
            }
        });
        $rootScope.languageDescription = function (iso) {
            var language = $rootScope.languagesMap[iso];
            if (!language || 0 === language.length) {
                return iso;
            }
            return language;
        }

        $rootScope.timezones = {};
        Util.timezones(function (response) {
            if (response.result != null) {
                for (var key in response.result) {
                    var value = response.result[key];
                    $rootScope.timezones[value] = value;
                }
            }

            $rootScope.timezones[''] = 'No timezone';
        })


        $rootScope.location = rtrim(rtrim($location.absUrl(), '/#/'), '/');
        $rootScope.startLocation = $rootScope.location
        $rootScope.host = $location.host();

        $rootScope.uniqueButton = new Date().getTime();


        $rootScope.generateButton = function () {
            $location.path('/generatebutton').replace();
        }


        $rootScope.userSession = userSession;

        $rootScope.api_url = api_url;

        if (!$window.addEventListener) {

            $window.attachEvent('message', resizeMobbrdiv);

        } else {

            $window.addEventListener('message', resizeMobbrdiv, false);
        }

        function resizeMobbrdiv(e) {

            if (e.data === 'small') {

                $('#mobbr_div').removeClass('full').addClass('small');

            } else if (e.data === 'full') {

                $('#mobbr_div').removeClass('small').addClass('full');
            }
        }

        $rootScope.scrollToId = function(id){
            $location.hash(id);
            $anchorScroll();

        }


    }]);


function rtrim(str, chr) {
    var rgxtrim = (!chr) ? new RegExp('\\s+$') : new RegExp(chr + '+$');
    return str.replace(rgxtrim, '');
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


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

