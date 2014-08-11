'use strict';

angular.module('mobbr.controllers').controller('WalletController', function ($scope, $modal, $window, $location, $state, $stateParams, MobbrXPayment, MobbrBalance) {

    $scope.dashboard = {};

    MobbrXPayment.get(function (response) {
        $scope.payments = response.result;
    });

    MobbrXPayment.supportedCurrencies(function(response){
        $scope.walletAddresses = response.result;
    });


    MobbrBalance.user(function (response) {
        if(response && response.result){
            $scope.dashboard.total_currency_iso = response.result.total_currency_iso;
            $scope.dashboard.total_amount = response.result.total_amount;
        }
    });

//    $scope.removePledges = function (ids) {
//        return $modal.open({
//            backdrop: true,
//            keyboard: true,
//            backdropClick: false,
//            templateUrl: 'views/partials/remove_pledges_popup.html',
//            controller: function ($scope) {
//                $scope.ids = ids;
//                $scope.confirm = function (result) {
//                    MobbrPayment.unpledge({ ids: result }, function () {
//                        $scope.$close();
//                        // TODO: there is no need reload the state again, only data should be reloaded
//                        //$state.transitionTo($state.current, $stateParams, { reload: true });
//                        table.reload();
//                    });
//                };
//            }
//        });
//    }
//
//    $scope.deposit = function () {
//        $modal.open({
//            backdrop: true,
//            keyboard: true,
//            backdropClick: false,
//            templateUrl: 'views/partials/deposit_popup.html',
//            controller: 'DepositController'
//        }).result.then(function (response) {
//            $window.location.href = response;
//        });
//    }
//
//    $scope.withdraw = function () {
//        $modal.open({
//            backdrop: true,
//            keyboard: true,
//            backdropClick: false,
//            templateUrl: 'views/partials/withdraw_popup.html',
//            controller: 'WithdrawController'
//        }).result.then(reload);
//    }
});