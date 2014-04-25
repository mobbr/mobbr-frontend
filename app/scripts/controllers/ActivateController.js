'use strict';

angular.module('mobbr.controllers').controller('ActivateController', function ($scope, $routeParams, MobbrUser) {

    MobbrUser.linkLogin({ login_token: $routeParams.hash });
});
