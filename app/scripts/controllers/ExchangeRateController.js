'use strict';

angular.module('mobbr.controllers').controller('ExchangeRateController', function ($scope, MobbrApi) {

    $scope.exchangerates = MobbrApi.forexRates();
    $scope.sortField = 'currency_iso';
    $scope.sortOrder = false;

    $scope.sortBy = function(field){
        if(field === $scope.sortField){
            $scope.sortOrder = !$scope.sortOrder;
        }   else{
            $scope.sortField = field;
            $scope.sortOrder = false;
        }
    }
});