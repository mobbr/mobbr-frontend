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
                console.log('external login');
                $rootScope.$emit('userStorage:login-external', user);
            } else if (!value && authorization) {
                clear();
                console.log('external logout');
                $rootScope.$emit('userStorage:logout-external');
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
            console.log('storage save');
            $rootScope.$emit('userStorage:saved');
        }

        function clear() {
            authorization = undefined;
            delete $http.defaults.headers.common['Authorization'];
            delete $localStorage.authorization;
            delete $localStorage.user;
            delete $sessionStorage.user;
            console.log('storage clear');
            $rootScope.$emit('userStorage:cleared');
        }

        function setAuthorization() {
            $http.defaults.headers.common['Authorization'] = authorization;
        }

        $rootScope.$storage = $localStorage;
        $rootScope.$watch('$storage.authorization', sync);
        $rootScope.$on('userSession:login', save);
        $rootScope.$on('userSession:logout', clear);
        $rootScope.$on('userSession:update', save);

        /*

        disabled because it makes new tabs with no access to the session clear the localstorage,
        if there is no session we should check if one of the other tabs has a session
        if there is another session sync this and if not clear all users data

        if (!$sessionStorage.user) {
            console.log('no session, clear the user info');
            clear();
        }*/

        if (!$localStorage.user) {
            if ($window.parent && $window.parent.postMessage) {
                console.log('post logout message');
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
