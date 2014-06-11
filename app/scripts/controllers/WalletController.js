'use strict';

angular.module('mobbr.controllers').controller('WalletController', function ($scope, $modal, $window, $location, MobbrBalance, MobbrXPayment, MobbrPayment) {

    $scope.payments = MobbrPayment.get();
    $scope.pledged = MobbrPayment.pledged();

    function reload() {
        $scope.balances = MobbrBalance.user();
        $scope.mutations = MobbrXPayment.get();
    }

    $scope.removePledgesDialog = function (ids) {
        return $modal.open({
            backdrop: true,
            keyboard: true,
            backdropClick: false,
            templateUrl: 'views/partials/remove_pledges_popup.html',
            controller: function ($scope) {
                $scope.ids = ids;
                $scope.confirm = function (result) {
                    MobbrPayment.unpledge(result, function () {
                        $scope.$close();
                    });
                };
            }
        });
    }

    $scope.openDepositDialog = function () {
        $modal.open({
            backdrop: true,
            keyboard: true,
            backdropClick: false,
            templateUrl: 'views/partials/deposit_popup.html',
            controller: 'DepositController'
        }).result.then(function (response) {
            $window.location.href = response;
        });
    }

    $scope.openWithdrawDialog = function () {
        $modal.open({
            backdrop: true,
            keyboard: true,
            backdropClick: false,
            templateUrl: 'views/partials/withdraw_popup.html',
            controller: 'WithdrawController'
        }).result.then(reload);
    }

    reload();
});