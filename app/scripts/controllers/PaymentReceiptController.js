'use strict';

angular.module('mobbr.controllers').controller('PaymentReceiptController', function ($scope,PaymentReceipt,$routeParams,Msg) {
    $scope.payment = {};
    $scope.searchentries;

    PaymentReceipt.getPaymentReceipt({id:$routeParams.id},function(response){
        if(response.result != null && response.result != undefined){
            $scope.payment = response.result;
        }else{
            Msg.setResponseMessage( 'error', 'Payment receipt not found',response);
        }
    },function(response){
        Msg.setResponseMessage( 'error', 'Payment receipt not found',response);
    });

});