angular.module('mobbr.controllers').controller('CrowdsController', function ($scope, $stateParams, MobbrApi, MobbrPerson) {
    'use strict';

    $scope.$on('$routeChangeSuccess', function(){
    if($stateParams.url){
        $scope.url = $stateParams.url;

    }

    });

});
