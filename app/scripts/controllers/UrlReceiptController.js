'use strict';

angular.module('mobbr.controllers').controller('UrlReceiptController', function ($scope,Url,$routeParams,$location,$window,Msg) {

    var url = document.referrer.replace(/[\/?#]*$/, "");

    if (!$routeParams.url) {
        $location.path('/url/' + $window.btoa(url)).replace();;
    }

    $scope.url = $window.atob($routeParams.url);
    $scope.payment = {};
    $scope.urlParam = {url:$scope.url};
    Url.fullData($scope.urlParam,function(response){
        if(response.result != null && response.result != undefined){
            $scope.payment = response.result;
        }else{
            Msg.setResponseMessage( 'error', 'URL info not found',response);
        }
    },function(response){
        Msg.setResponseMessage( 'error', 'URL info not found',response);
    });

    $scope.personPayments = [];
    Url.personPayments($scope.urlParam,function(response){
        if(response.result != null && response.result != undefined){
            $scope.personPayments = response.result;
        }else{
            Msg.setResponseMessage( 'error', 'URL info not found',response);
        }
    },function(response){});


    $scope.balances = [];
    Url.balances($scope.urlParam,function(response){
        $scope.balances = response.result;
    },function(response){});

});