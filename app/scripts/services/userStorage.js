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
                $rootScope.$emit('userStorage:login-external', user);
                console.log('external login');
            } else if (!value && authorization) {
                clear();
                $rootScope.$emit('userStorage:logout-external');
                console.log('external logout');
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
            console.log('storage save');
        }

        function clear() {
            authorization = undefined;
            delete $http.defaults.headers.common['Authorization'];
            delete $localStorage.authorization;
            delete $localStorage.user;
            delete $sessionStorage.user;
            $rootScope.$emit('userStorage:cleared');
            console.log('storage clear');
        }

        function setAuthorization() {
            $http.defaults.headers.common['Authorization'] = authorization;
        }

        $rootScope.$storage = $localStorage;
        $rootScope.$watch('$storage.authorization', sync);
        $rootScope.$on('userSession:login', save);
        $rootScope.$on('userSession:logout', clear);

        if (!$sessionStorage.user) {
            clear();
            if ($window.parent && $window.parent.postMessage) {
                $window.parent.postMessage('logout', '*');
            }
        }

        return {
            sync: sync,
            save: save,
            clear: clear
        };
    }
);
