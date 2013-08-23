'use strict';

angular.module('mobbr.controllers', []);

angular.module('mobbr', [

        'mobbr.controllers',
        'mobbr.services.Gateway',
        'mobbr.services.user',
        'LocalStorageModule',
        'mobbr.services.mbr-api'

    ]).config([ '$httpProvider', function ($httpProvider, Msg) {

        $httpProvider.responseInterceptors.push(function($q, $timeout, userSession, Msg) {

            var timer;

            return function (promise) {
                $timeout.cancel(timer);
                timer = $timeout(function () {
                    if (userSession.authenticated) {
                        Msg.addNotification('Session timed out');
                        userSession.doLogout();
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
    }).run([ 'localStorageService','$http', 'userSession', function (localStorageService, $http, userSession) {

        var authorization = localStorageService.get('Authorization');
        if(authorization !== null && authorization != undefined){
            userSession.authenticated = true;
            userSession.user = localStorageService.get('User');

            $http.defaults.headers.common['Authorization'] = authorization;
        }
    }]);