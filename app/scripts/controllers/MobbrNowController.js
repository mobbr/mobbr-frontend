'use strict';

angular.module('mobbr.controllers').controller('MobbrNowController', function ($scope, $cookies, $rootScope, userSession) {

  $rootScope.showMobbrFrame = false;
  $scope.csrftoken = $cookies.csrftoken;

  $scope.showMobbr = function () {
    $rootScope.showMobbrFrame = true;
  }

  $scope.closeMobbrNow = function () {
    userSession.lastCheck = null;
    userSession.authenticated = false;

    $rootScope.showMobbrFrame = false;
    $rootScope.uniqueButton = new Date().getTime();
    $('#mobbr_div').removeClass('full').addClass('small');
    $('#mobbr_frame').attr('src', '');
  }

  $scope.submit = function () {
    $rootScope.location = rtrim(rtrim($scope.mobbrnowInput, '/#/'), '/');

    setTimeout(function () {
      mobbr.show_mobbr_div(1);
      setTimeout(function () {
        $rootScope.showMobbrFrame = true;
        $scope.$apply();
      }, 100);
    }, 200);

  }

});