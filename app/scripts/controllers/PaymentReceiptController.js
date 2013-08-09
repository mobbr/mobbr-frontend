'use strict';

angular.module('mobbr.controllers').controller('PaymentReceiptController', function ($scope,PaymentReciept,$routeParams,Msg) {
    $scope.payment = {};
    $scope.searchentries;

    PaymentReciept.getPaymentReciept({id:$routeParams.id},function(response){
        if(response.result != null && response.result != undefined){
            $scope.payment = response.result;
        }else{
            Msg.setResponseMessage( 'error', 'Payment receipt not found',response);
        }
    },function(response){
        Msg.setResponseMessage( 'error', 'Payment receipt not found',response);
    });

});