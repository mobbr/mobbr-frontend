'use strict';

angular.module('mobbr.controllers').controller('LinkLoginController', function ($scope, $route, $routeParams, MobbrUser) {

    $scope.authenticating = MobbrUser.linkLogin({ login_token: $routeParams.hash });
});