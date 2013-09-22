'use strict';

angular.module('mobbr.controllers').controller('SearchDomainController', function ($scope,$location, $window) {
    $scope.searchDomainInput = '';
    $scope.searchDomain = function(){
        if($scope.searchDomainInput){
            $location.path('/domain/' + $window.btoa($scope.searchDomainInput));
        }
    }
});