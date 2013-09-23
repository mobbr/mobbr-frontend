'use strict';

angular.module('mobbr.services.user', [

        'mobbr.services.mbr-api',
        'mobbr.services.timeout'

    // TODO: put notifyparent in a seperate service

    ]).factory('userSession',function ($injector, $location, $window, $rootScope, userStorage, Msg, idleTimeout) {

        var userSession = {
            authenticated: false,
            user: undefined,
            doLogin: function (user, notifyParent) {

                userSession.authenticated = true;
                userSession.user = user;
                $rootScope.$emit('userSession:login', user);

                if (notifyParent) {
                    // if we are in an iframe we let our parent know we are logged in
                    if ($window.parent && $window.parent.postMessage) {
                        $window.parent.postMessage([ this.user.username, this.user.email ].join('|'), '*');
                    }
                }
            },
            doLogout: doLogout,
            authenticate: function () {

                var $route = $injector.get('$route'),
                    route = $route.current && $route.current.$route;

                if (route && route.authsettings && route.authsettings.authenticated !== this.authenticated) {

                    route.authsettings.redirectTo && $location.path(route.authsettings.redirectTo);
                    if (this.authenticated === false) Msg.addNotification('Please login at the account menu');

                    return false;

                } else {

                    return true;
                }
            }
        };

        function doLogout(notifyParent) {

            userSession.user = undefined;
            userSession.authenticated = false;
            $rootScope.$emit('userSession:logout');

            if (notifyParent) {
                // if we are in an iframe we let our parent know we are logged in
                if ($window.parent && $window.parent.postMessage) {
                    $window.parent.postMessage('logout', '*');
                }
            }
        }

        function reload() {
            $injector.get('$route').reload();
        }

        function logout() {
            doLogout(true);
        }

        function login(event, user) {
            userSession.doLogin(user, true);
        }

        $rootScope.userSession = userSession;
        $rootScope.$on('idleTimeout:timeout', logout);
        $rootScope.$on('userStorage:login-external', login);
        $rootScope.$on('userStorage:logout-external', logout);
        $rootScope.$on('userStorage:saved', reload);
        $rootScope.$on('userStorage:cleared', reload);

        return userSession;

    }).factory('HttpLoggedInInterceptor', function($injector, $q){

        return function(promise) {
            promise.then(function () {}, function (response) {

                var userSession = $injector.get('userSession');

                if (response != null && response.status != null && (response.status === 401 || response.status === 0) && userSession.authenticated) {
                    userSession.doLogout(true);
                }

                return $q.reject(response);
            });

            return promise;
        }

    }).config(function ($httpProvider) {

        $httpProvider.responseInterceptors.push('HttpLoggedInInterceptor');

    })/*.directive('userPassword',function (User, Msg, $http) {

        return {

            restrict: 'A',
            link: function (scope, element, attrs) {

                scope.settings = User.settings;

                element.bind('submit', function (event) {

                    User.setPassword({'new_password': scope.new_password}, function (response) {
                        if (response.result === true) {
                            Msg.addNotification('Saved password');
                        }
                        else if (response.message != null) {
                            scope.new_password = '';
                            scope.new_password_control = '';
                            Msg.setResponseMessage('info', 'Save password', response);
                        }
                    }, function (response) {
                        Msg.setResponseMessage('error', 'Error saving password', response);
                    });
                });
            }
        };

    })*/.directive('userRegister',function (User, Msg,$routeParams) {

        // TODO: Put this in join controller

        return {

            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {

                scope.waiting = false;
                scope.email = $routeParams.email;
                scope.register = function () {
                    var user = {'email': scope.email, 'username': scope.username, 'password': scope.password, 'password_control': scope.password_control};
                    scope.waiting = true;

                    User.register(user, function (response) {
                        Msg.setResponseMessage('info', '', response);
                        scope.waiting = false;
                        scope.email = '';
                        scope.username = '';
                        scope.password = '';
                        scope.password_control = '';
                    }, function (response) {
                        Msg.setResponseMessage('error', 'Couldn\'t send information', response);
                        scope.waiting = false;
                    });
                }
            }
        };

    })/*.directive('userRecover', function (User, Msg) {

        return {

            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                scope.waiting = false;

                scope.recover = function () {
                    scope.waiting = true;
                    User.recover({email: scope.email}, function (response) {
                        Msg.setResponseMessage('info', 'Recover user', response);
                        scope.waiting = false;
                    }, function (response) {
                        Msg.setResponseMessage('error', 'Couln\'t recover user', response);
                        scope.waiting = false;
                    });
                }
            }
        };
    }
);*/
