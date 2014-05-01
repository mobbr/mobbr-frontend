'use strict';

angular.module('mobbr.services')
    .factory('authResolver', function ($q, $state, mobbrSession) {

        var deferred = $q.defer();

        $timeout(function () {

            if ($state.current && $state.current.data && $state.current.data.authenticated !== mobbrSession.isAuthorized()) {
                deferred.reject();
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;

    }).run(function ($rootScope, $state, mobbrMsg) {

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            mobbrMsg.add({ msg: 'Please login at the account menu' })
            $state.go(toState.data.redirectTo);
        });
    }
);