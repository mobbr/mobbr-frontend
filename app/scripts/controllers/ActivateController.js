'use strict';

angular.module('mobbr.controllers').controller('ActivateController', function ($scope, $stateParams, MobbrUser) {

    MobbrUser.linkLogin({ login_token: $stateParams.hash });
});
