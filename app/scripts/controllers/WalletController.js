'use strict';

angular.module('mobbr.controllers').controller('WalletController', function ($scope, $modal, MobbrXPayment, balance) {

    $scope.dashboard = balance;
});