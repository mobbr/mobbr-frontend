'use strict';

angular.module('mobbr.services.storage', [

        'ngStorage'

    ]).factory('userStorage', function ($rootScope, $localStorage, $injector) {

        var authorization,
            user,
            $http = $http || $injector.get('$http'),
            userStorage = {
                init: function () {
                    authorization = $localStorage.authorization;
                    user = $localStorage.user;
                    if (authorization && user) {
                        setAuthorization();
                        return user;
                    } else {
                        return false;
                    }
                },
                save: function (user) {
                    $localStorage.user = user;
                    if (!authorization) {
                        authorization = 'Basic ' + encode64(':' + user.password);
                        $localStorage.authorization = authorization;
                        setAuthorization();
                    }
                },
                clear: function () {
                    delete userStorage.authorization;
                    delete $http.defaults.headers.common['Authorization'];
                    delete $localStorage.authorization;
                    delete $localStorage.user;
                }
            };

        function setAuthorization() {
            userStorage.authorization = authorization;
            $http.defaults.headers.common['Authorization'] = authorization;
        }

        return userStorage;
    }
);
