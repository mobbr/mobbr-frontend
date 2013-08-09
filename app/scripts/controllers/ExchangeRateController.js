'use strict';

angular.module('mobbr.controllers').controller('ExchangeRateController', function ($scope, ExchangeRates, Msg) {

    $scope.exchangerates = []

    ExchangeRates.exchangerates(function(response){
        if(response.result != undefined && response.result != null){
            $scope.exchangerates = response.result;
        }else{
            Msg.setResponseMessage( 'error', 'Couldn\'t load exchange rates',response);
        }
    },function (response){
        Msg.setResponseMessage( 'error', 'Couldn\'t load exchange rates',response);
    });

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