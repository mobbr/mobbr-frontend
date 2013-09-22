'use strict';

angular.module('mobbr.services.storage', [

        'ngStorage'

    ]).factory('userStorage', function ($rootScope, $sessionStorage, $injector, $window) {

        var authorization,
            user,
            $http = $http || $injector.get('$http');

        function sync(value) {
            console.log('try sync', authorization, value);
            if (!authorization && value) {
                console.log('login');
                authorization = $sessionStorage.authorization;
                user = $sessionStorage.user;
                setAuthorization();
                $rootScope.$emit('login-external', user);
            } else if (!value && authorization) {
                console.log('logout');
                clear();
                $rootScope.$emit('logout-external');
            }
        }

        function save(event, user) {
            $sessionStorage.user = user;
            if (!authorization) {
                authorization = 'Basic ' + $window.btoa(':' + user.password);
                $sessionStorage.authorization = authorization;
                setAuthorization();
            }
        }

        function clear() {
            authorization = undefined;
            delete $http.defaults.headers.common['Authorization'];
            delete $sessionStorage.authorization;
            delete $sessionStorage.user;
        }

        function setAuthorization() {
            $http.defaults.headers.common['Authorization'] = authorization;
        }

        $rootScope.$storage = $sessionStorage;
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
