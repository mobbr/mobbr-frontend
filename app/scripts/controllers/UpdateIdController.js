'use strict';

angular.module('mobbr.controllers').controller('UpdateIdController', function ($state, MobbrUser) {

    MobbrUser.confirmEmailId({
        confirm_token: $state.params.hash
    }, function () {
        $state.go('settings.ids');
    }, function () {
        $state.go('main');
    });
});