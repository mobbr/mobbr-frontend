'use strict';

angular.module('mobbr.controllers').controller('ActivateController', function ($scope, $stateParams, $state, MobbrUser) {

    MobbrUser.linkLogin({ login_token: $stateParams.hash }, function () {
        $state.go('wallet');
    }, function () {
        $state.go('main');
    });
});
