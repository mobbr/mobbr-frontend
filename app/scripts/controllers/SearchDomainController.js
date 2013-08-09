'use strict';

angular.module('mobbr.controllers').controller('SearchDomainController', function ($scope,$location) {
    $scope.searchDomainInput = '';
    $scope.searchDomain = function(){
        if($scope.searchDomainInput){
            $location.path('/domain/' + encode64($scope.searchDomainInput));
        }
    }
});