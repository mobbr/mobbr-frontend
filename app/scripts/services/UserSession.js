'use strict';

angular.module('mobbr.services.user', [

        'mobbr.services.mbr-api',
        'mobbr.services.timeout'

    // TODO: put notifyparent in a seperate service

    ]).factory('userSession',function ($injector, $location, $window, $rootScope, userStorage, Msg, idleTimeout) {

        function clearLogin(notifyParent) {

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

        var userSession = {
            authenticated: false,
            user: undefined,
            lastCheck: null,
            redirectAfterLogin: null,
            redirectAfterLoginIn: null,
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
            doLogout: function(notifyParent){
                clearLogin(notifyParent);
                this.reload();
            },
            clearLogin: clearLogin,
            reload: function () {
                $injector.get('$route').reload();
            },
            authenticate: function () {
                var $route = $injector.get('$route');
                var $location = $injector.get('$location');

                var route = $route.current && $route.current.$route;

                if (route && route.authsettings && route.authsettings.authenticated !== this.authenticated) {
                    // if authentication is in progress we want to redirect after auth to that route

                    if (this.authenticated === false) {


                        if (route.authsettings.authenticated === true) {

                            if (!this.redirectAfterLogin) {

                                this.redirectAfterLogin = $location.path();
                                this.redirectAfterLoginIn = new Date().getTime() + 60000;   // 60 seconds more than enough
                            }

                            $location.path(route.authsettings.redirectTo);
                            Msg.addNotification('Please login at the account menu');
                            console.log('authentication is required, we dont know if we are authenticated, redirect but come back when we know');
                            console.log('setting redirectAfterLogin ' + this.redirectAfterLogin);
                            $route.reload();

                        } else if (route.authsettings.authenticated === false) {

                            if (!this.redirectAfterLogin) {

                                this.redirectAfterLogin = route.authsettings.redirectTo;
                                this.redirectAfterLoginIn = new Date().getTime() + 60000;   // 60 seconds more than enough
                            }

                            Msg.addNotification('Please login at the account menu');
                            console.log('authentication should be false, we dont know if we are authenticated, redirect when we know');
                            console.log('setting redirectAfterLogin ' + this.redirectAfterLogin)
                        }

                    } else {

                        $location.path(route.authsettings.redirectTo);
                        console.log('authentication does not meet requirements, redirect');
                    }
                }
            }
        };

        $rootScope.$on('idleTimeout:timeout', function (event) {
            userSession.doLogout(true);
        });

        $rootScope.$on('login-external', function (event, user) {
            userSession.doLogin(user, true);
        });

        $rootScope.$on('logout-external', function (event) {
            userSession.doLogout(true);
        });

        return userSession;

    }).directive('userPassword',function (User, Msg, $http) {

        return {

            restrict: 'A',
            link: function (scope, element, attrs) {

                scope.settings = User.settings;

                element.bind('submit', function (event) {

                    // TODO: this should be moved to a controller and a service
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

    }).directive('userRegister',function (User, Msg,$routeParams) {

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

    }).directive('userRecover', function (User, Msg) {

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
);
