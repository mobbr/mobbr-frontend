'use strict';

angular.module('mobbr.services').run(function ($rootScope, $state, $timeout, $modal, mobbrMsg, mobbrSession) {

    var timeout, modal;

    function cancelTimeout() {
        if (modal) {
            console.log();
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

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, error) {

        cancelTimeout();
        timeout = $timeout(showProgress, 1000);

        if (toState.data && toState.data.authenticated !== mobbrSession.isAuthorized()) {
            event.preventDefault();
            mobbrMsg.add({ msg: 'Please login at the account menu' });
            $state.go(toState.data.redirectTo);
        }
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
});