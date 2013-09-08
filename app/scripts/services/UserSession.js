'use strict';

angular.module('mobbr.services.user', ['mobbr.services.mbr-api', 'LocalStorageModule']).factory('userSession',function ($injector, localStorageService,$location,Msg) {

    function clearLogin() {
        var $http = $http || $injector.get('$http');
        delete $http.defaults.headers.common['Authorization'];
        localStorageService.clearAll();
        userSession.user = undefined;
        userSession.authenticated = false;
    }

    var userSession = {
        authenticated: false,
        user: undefined,
        lastCheck: null,
        redirectAfterLogin: null,
        redirectAfterLoginIn: null,
        doLogin: function (user) {
            var $http = $http || $injector.get('$http');
            // Login with the received token
            this.authenticated = true;
            this.user = user;

            // Set Basic Auth header for subsequent calls
            var headerValue = 'Basic ' + encode64(':' + userSession.user.password);
            userSession.user.password = null;
            $http.defaults.headers.common['Authorization'] = headerValue;

            localStorageService.clearAll();
            localStorageService.add('Authorization', headerValue);
            localStorageService.add('User', user);
        },
        doLogout: function(){
            clearLogin();
            this.reload();
        },
        clearLogin: clearLogin,
        reload: function () {
            var $route = $injector.get('$route');

            $route.reload();
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
                            Msg.setResponseMessage('info', 'Saved password', response);
                        }
                    }, function (response) {
                        Msg.setResponseMessage('error', 'Could not save password', response);
                    });
                });
            }
        };

    }).directive('userRegister',function (User, Msg,$routeParams) {



        return {

            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {

                scope.email = $routeParams.email;

                element.bind('submit', function (event) {

                    var user = {'email': scope.email, 'username': scope.username, 'password': scope.password, 'password_control': scope.password_control};

                    User.register(user, function (response) {
                        Msg.setResponseMessage('info', 'User registered', response);
                    }, function (response) {
                        Msg.setResponseMessage('error', 'Could not send information', response);
                    });
                });
            }
        };

    }).directive('userRecover', function (User, Msg) {

        return {

            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {

                element.bind('submit', function (event) {

                    User.recover({email: scope.email}, function (response) {
                        Msg.setResponseMessage('info', 'Recovered user', response);
                    }, function (response) {
                        Msg.setResponseMessage('error', 'Could not recover user', response);
                    });
                });
            }
        };
    }
);
