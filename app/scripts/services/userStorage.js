'use strict';

angular.module('mobbr.services.storage', [

        'ngStorage'

    ]).factory('userStorage', function ($rootScope, $localStorage, $sessionStorage, $injector, $window) {

        var authorization,
            user,
            $http = $http || $injector.get('$http');

        function sync(value) {
            if (!authorization && value) {
                authorization = $localStorage.authorization;
                user = $localStorage.user;
                setAuthorization();
                $rootScope.$emit('login-external', user);
            } else if (!value && authorization) {
                clear();
                $rootScope.$emit('logout-external');
            }
        }

        function save(event, user) {
            $localStorage.user = user;
            $sessionStorage.user = user;
            if (!authorization) {
                authorization = 'Basic ' + $window.btoa(':' + user.password);
                $localStorage.authorization = authorization;
                setAuthorization();
            }
            $rootScope.$emit('userStorage:saved');
        }

        function clear() {
            authorization = undefined;
            delete $http.defaults.headers.common['Authorization'];
            delete $localStorage.authorization;
            delete $localStorage.user;
            delete $sessionStorage.user;
            $rootScope.$emit('userStorage:cleared');
        }

        function setAuthorization() {
            $http.defaults.headers.common['Authorization'] = authorization;
        }

        if (!$sessionStorage.user) {
            clear();
        }

        $rootScope.$storage = $localStorage;
        $rootScope.$watch('$storage.authorization', sync);
        $rootScope.$on('userSession:login', save);
        $rootScope.$on('userSession:logout', clear);

        return {
            sync: sync,
            save: save,
            clear: clear
        };
    }
);
