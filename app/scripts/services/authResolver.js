'use strict';

angular.module('mobbr.services').run(function ($rootScope, $state, $timeout, $modal, mobbrMsg, mobbrSession) {

    var timeout, modal;

    function cancelTimeout() {
        if (modal) {
            modal.dismiss();
            modal = null;
        }
        if (timeout) {
            $timeout.cancel(timeout);
            timeout = null;
        }
    }

    function showProgress() {
        modal = $modal.open({
            backdrop: 'static',
            keyboard: true,
            templateUrl: 'views/partials/progress_popup.html'
        });
    }

    function authState(toState, event) {

        if (toState.data && toState.data.authenticated !== undefined && toState.data.authenticated !== mobbrSession.isAuthorized()) {
            event && event.preventDefault();
            if(mobbrSession.isAuthorized() === false){
                mobbrMsg.add({ msg: 'Please login at the account menu' });
            }
            $state.go(toState.data.redirectTo);
        }
    }

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, error) {
        cancelTimeout();
        timeout = $timeout(showProgress, 1000);
        authState(toState, event);
    });

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {

        cancelTimeout();

        mobbrMsg.add({ msg: 'Something went wrong trying to open this page', type: 'danger' });
        if (toState.data && toState.data.redirectTo) {
            $state.go(toState.data.redirectTo);
        } else {
            $state.go('main');
        }
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, error) {
        cancelTimeout();
    });

    $rootScope.$on('mobbrApi:authchange', function () {
        authState($state.current);
    });
});