angular.module('mobbr.controllers').controller('PaymentReceiptController', function ($scope, $stateParams, $state, MobbrPayment, MobbrXPayment, MobbrInvoice, filterFilter, $window) {
    'use strict';


    var paymentResponse = function (response) {
        if (response.result) {
            $scope.payment = response.result;
            $scope.recieversAndSenders = [];
            angular.forEach($scope.payment.senders, function (sender) {
                $scope.recieversAndSenders.push(sender);
            });
            angular.forEach($scope.payment.receivers, function (reciever) {
                $scope.recieversAndSenders.push(reciever);
            });

        }
    };

    function retrievePayment() {
        if ($state.includes('x-payment')) {
            MobbrXPayment.info({id: $stateParams.id}).$promise.then(
                paymentResponse
            );
        } else {
            MobbrPayment.info({id: $stateParams.id}).$promise.then(
                paymentResponse
            );
        }
    }
    retrievePayment();

    $scope.filterSelectedIds = function (data) {
        var selected = filterFilter(data, { selected: true});
        if (selected && selected.length > 0) {
            var ids = [];
            angular.forEach(selected, function (elem) {
                ids.push(elem.share_id);
            });
            return ids;
        }
        return [];
    };


    $scope.selectAll = {selected: false};
    $scope.$watch('selectAll.selected', function (newValue) {
        angular.forEach($scope.recieversAndSenders, function (participant) {
            if (participant.share_id) {
                participant.selected = newValue;
            }
        });
    });

    $scope.download = function () {
        var selected = $scope.filterSelectedIds($scope.recieversAndSenders);
        if (selected && selected.length > 0) {
            MobbrInvoice.get({share_ids: selected}).$promise.then(function (response) {
                $window.saveAs(new Blob([ response.data ], { type: response.type }), 'mobbr-invoices.zip');
            });

        }
    };
});
