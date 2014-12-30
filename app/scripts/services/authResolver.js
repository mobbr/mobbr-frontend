'use strict';

angular.module('mobbr.services').run(function ($rootScope, $state, $timeout, $modal, $window, mobbrMsg, mobbrSession) {

    function authState(toState, event, fromState) {

        if (toState.data && toState.data.authenticated !== undefined && toState.data.authenticated !== mobbrSession.isAuthorized()) {

            event && event.preventDefault();

            if(mobbrSession.isAuthorized() === false) {
                mobbrMsg.add({ msg: 'Please login at the account menu' });
                $state.go('userlogin');
            }

            return false;
        }
    }

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, error) {
        authState(toState, event, fromState);
    });

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        $window.ga('send', 'event', 'error', 'openening state', 'name', toState.name);
        mobbrMsg.add({ msg: 'Something went wrong trying to open this page', type: 'danger' });
    });

    $rootScope.$on('mobbrApi:authchange', function () {
        authState($state.current);
    });

    $rootScope.mobbrSession = mobbrSession;
});