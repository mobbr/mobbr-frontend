/* global ngTableParams */
angular.module('mobbr.controllers').controller('PaymentsController', function ($scope, $filter, $window, ngTableParams, MobbrPayment, MobbrInvoice, filterFilter, $timeout) {
    'use strict';


    $scope.paymentTable = {data: []};
    $scope.pledgedTable = {};
    $scope.unclaimedTable = {};

    $scope.filterSelectedIds = function (data) {
        var selected = filterFilter(data, { selected: true });
        if (selected && selected.length > 0) {
            var ids = [];
            angular.forEach(selected, function (elem) {
                ids.push(elem.id || elem.share_id);
            });
            return ids;
        }
        return [];
    };

    $scope.retrievePayments = function (searchParam) {
        MobbrPayment.get({search: searchParam, offset: $scope.paymentTable.data.length, limit: 10}, function (response) {
            if (response.result) {
                angular.forEach(response.result, function (item) {
                    $scope.paymentTable.data.push(item);
                });
            }
        });
    };
    $scope.retrievePayments();

    $scope.$watch('paymentTable.search', function () {

        if ($scope.SearchPaymentDataTimeout) {
            $timeout.cancel($scope.SearchPaymentDataTimeout);
        }
        $scope.SearchPaymentDataTimeout = $timeout(function () {
            $scope.SearchPaymentDataTimeout = undefined;
            if ($scope.paymentTable.search !== undefined) {
                if ($scope.paymentTable.search.length >= 3) {
                    while ($scope.paymentTable.data.length > 0) {
                        $scope.paymentTable.data.pop();

                    }
                    $scope.retrievePayments($scope.paymentTable.search);
                } else {
                    $scope.retrievePayments();
                }
            }

        }, 300);
    });

    function retrievePledges() {
        MobbrPayment.pledged().$promise.then(function (response) {
            $scope.pledgedTable.data = response.result;
        });
    }
    retrievePledges();

    function retrieveUnclaimedShares() {
        MobbrPayment.unclaimedShares().$promise.then(function (response) {
            $scope.unclaimedTable.data = response.result;
        });
    }
    retrieveUnclaimedShares();

    $scope.removePledes = function () {
        var selected = $scope.filterSelectedIds($scope.pledgedTable.data);
        if (selected && selected.length > 0) {
            MobbrPayment.unpledge({ids: selected}).$promise.then(function () {
                retrievePledges();
            });
        }
    };

    $scope.revokeSelectedShares = function () {
        var selected = $scope.filterSelectedIds($scope.unclaimedTable.data);
        if (selected && selected.length > 0) {
            console.log(selected);
            MobbrPayment.unclaimShares({share_ids: selected}).$promise.then(function () {
                retrieveUnclaimedShares();
            });

        }
    };

    $scope.downloadInvoiceSelectedPayments = function () {
        var selected = $scope.filterSelectedIds($scope.paymentTable.data);
        if (selected && selected.length > 0) {
            MobbrInvoice.get({payment_ids: selected}, function (response) {
                $window.saveAs(new Blob([ response.data ], { type: response.type }), 'mobbr-invoices.zip');
            });
        }
    };

});