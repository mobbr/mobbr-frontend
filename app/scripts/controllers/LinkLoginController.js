'use strict';

angular.module('mobbr.controllers').controller('LinkLoginController', function ($scope, $stateParams, $state, MobbrUser) {

    MobbrUser.linkLogin({ login_token: $stateParams.hash }, function () {
        $state.go('updates');
    }, function () {
        $state.go('main');
    });
});