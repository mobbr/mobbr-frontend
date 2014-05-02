'use strict';

angular.module('mobbr.services')
    .run(function ($rootScope, $state, mobbrMsg, mobbrSession) {

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, error) {
            if (toState.data && toState.data.authenticated !== mobbrSession.isAuthorized()) {
                event.preventDefault();
                mobbrMsg.add({ msg: 'Please login at the account menu' });
                $state.go(toState.data.redirectTo);
            }
        });

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            mobbrMsg.add({ msg: 'Something went wrong trying to open this page', type: 'danger' });
            if (toState.data && toState.data.redirectTo) {
                $state.go(toState.data.redirectTo);
            } else {
                $state.go('main');
            }
        });
    }
);