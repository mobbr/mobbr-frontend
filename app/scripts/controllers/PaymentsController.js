/* global ngTableParams */
angular.module('mobbr.controllers').controller('PaymentsController', function ($scope, $state, $filter, $window, MobbrPayment, MobbrInvoice, filterFilter, payments, pledges, unclaimed) {
    'use strict';

    $scope.data = {};
    $scope.data.payments = payments;
    $scope.data.pledges = pledges;
    $scope.data.unclaimed = unclaimed;

    function redirect() {
        var nameParts = $state.current.name.split('.');
        if (nameParts[0] === 'payments' && nameParts[1] !== undefined && $scope.data[nameParts[1]] !== undefined && $scope.data[nameParts[1]].result.length === 0) {
            $state.go('^');
        }
    }

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

    $scope.removePledes = function () {
        var selected = $scope.filterSelectedIds($scope.data/pledges.result);
        if (selected && selected.length > 0) {
            MobbrPayment.unpledge({ids: selected}).$promise.then(function () {
                pledges.$pledged(redirect);
            });
        }
    };

    $scope.revokeSelectedShares = function () {
        var selected = $scope.filterSelectedIds($scope.data.unclaimed.result);
        if (selected && selected.length > 0) {
            MobbrPayment.unclaimShares({share_ids: selected}).$promise.then(function () {
                unclaimed.$unclaimedShares(redirect);
            });

        }
    };

    $scope.downloadInvoiceSelectedPayments = function () {
        var selected = $scope.filterSelectedIds($scope.data.payments.result);
        if (selected && selected.length > 0) {
            MobbrInvoice.get({payment_ids: selected}, function (response) {
                $window.saveAs(new Blob([ response.data ], { type: response.type }), 'mobbr-invoices.zip');
            });
        }
    };

    $scope.$on('$stateChangeSuccess', redirect);
});