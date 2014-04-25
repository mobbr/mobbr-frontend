'use strict';

angular.module('mobbr.controllers').controller('LinkLoginController', function ($scope, $route, $stateParams, MobbrUser) {

    MobbrUser.linkLogin({ login_token: $stateParams.hash });
});