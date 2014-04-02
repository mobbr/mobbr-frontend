'use strict';

angular.module('mobbr.controllers').controller('PaymentReceiptController', function ($scope, MobbrPayment, MobbrXPayment, $routeParams, Msg, $location) {

  var params = { id: $routeParams.id };

  function onSuccess(response) {
    console.log(response);
    if(response.result !== null && response.result !== undefined) {
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

  if ($location.path().indexOf('x-payment') !== -1) {
    $scope.external = true;
    MobbrXPayment.info(params, onSuccess, onError);
  } else {
    MobbrPayment.info(params, onSuccess, onError);
  }

});