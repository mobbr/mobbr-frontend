'use strict';

angular.module('mobbr.controllers').controller('UpdateEmailController', function ($state, MobbrUser) {

    MobbrUser.confirmEmail({ update_token: $state.params.hash }, function () {
        $state.go('settings.account');
    }, function gotoMain() {
        $state.go('main');
    });
});