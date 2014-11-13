'use strict';

angular.module('mobbr.controllers').controller('UpdateEmailController', function ($scope, $state, mobbrSession, MobbrUser) {

    var is_id = $state.current.name === 'id',
        params = is_id ? { confirm_token: $state.params.hash } : { update_token: $state.params.hash };

    function gotoIds() {
        $state.go(is_id ? 'settings.ids' : 'settings.account');
    }

    function gotoMain() {
        $state.go('main');
    }

    MobbrUser[is_id ? 'confirmEmailId' : 'confirmEmail'](params, gotoIds, gotoMain);
});