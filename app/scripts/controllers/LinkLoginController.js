'use strict';

angular.module('mobbr.controllers').controller('LinkLoginController', function ($scope, $stateParams, MobbrUser) {

    MobbrUser.linkLogin({ login_token: $stateParams.hash });
});