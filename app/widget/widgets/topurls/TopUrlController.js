'use strict';

angular.module('mobbr.widgets').controller('TopUrlController', function (TopUrlService, $scope, $routeParams) {

  $scope.title = $routeParams['title'] ? $routeParams['title'] : '';

  $scope.urls = TopUrlService.urls();

  $scope.open = function (url) {
    window.open(url, 'target=_parent');
  }
});