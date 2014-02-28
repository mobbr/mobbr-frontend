'use strict';

angular.module('mobbr.controllers').controller('PaymentReceiptController', function ($scope, PaymentReceipt, Dashboard, $routeParams, Msg) {

  var params = { id: $routeParams.id };

  function onSuccess(response) {
    if(response.result !== null && response.result !== undefined) {
      console.log(response);
      $scope.payment = response.result;
    } else {
      Msg.setResponseMessage( 'error', 'Payment receipt not found',response);
    }
  }

  function onError(response) {
    Msg.setResponseMessage( 'error', 'Payment receipt not found',response);
  }

  $scope.payment = {};
  $scope.searchentries;
  $scope.external = false;

  if ($routeParams.external) {
    $scope.external = true;
    Dashboard.getExternalPaymentReceipt(params, onSuccess, onError);
  } else {
    PaymentReceipt.getPaymentReceipt(params, onSuccess, onError);
  }

});