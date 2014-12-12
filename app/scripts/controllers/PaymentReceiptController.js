angular.module('mobbr.controllers').controller('PaymentReceiptController', function ($scope, $stateParams, $state, mobbrSession, MobbrInvoice, filterFilter, $window, payment) {
    'use strict';

    function orderPersons() {

        $scope.unclaimed = false;
        $scope.userAmount = 0;
        $scope.userPaid = 0;
        $scope.receiversAndSenders = [];

        angular.forEach($scope.payment.result.senders, function (sender) {
            if (sender.username && $scope.thisUser && sender.username.toUpperCase() === $scope.thisUser.toUpperCase()) {
                sender.primary = 1;
                $scope.userPaid += parseFloat(sender.amount);
            } else {
                sender.primary = 0;
            }
            $scope.receiversAndSenders.push(sender);
        });

        angular.forEach($scope.payment.result.receivers, function (receiver) {
            if ((receiver.username && $scope.thisUser && receiver.username.toUpperCase() === $scope.thisUser.toUpperCase()) || ($scope.thisUser && receiver.unclaimed && receiver.unclaimed.toUpperCase() === $scope.thisUser.toUpperCase())) {
                receiver.primary = 1;
                $scope.userAmount += parseFloat(receiver.amount);
                if (receiver.unclaimed) {
                    $scope.unclaimed = true;
                }
            } else {
                receiver.primary = 0;
            }
            $scope.receiversAndSenders.push(receiver);
        });
    }

    function setUser() {
        $scope.thisUser = $state.params.username ? $state.params.username : mobbrSession.isAuthorized() && $scope.$mobbrStorage.user.username;
    }

    function filterSelectedIds(data) {
        var selected = filterFilter(data, { selected: true});
        if (selected && selected.length > 0) {
            var ids = [];
            angular.forEach(selected, function (elem) {
                ids.push(elem.share_id);
            });
            return ids;
        }
    };

    $scope.$watch('selectAll.selected', function (newValue) {
        angular.forEach($scope.receiversAndSenders, function (participant) {
            if (participant.share_id) {
                participant.selected = newValue;
            }
        });
    });

    $scope.download = function () {

        var selected = filterSelectedIds($scope.receiversAndSenders);

        if (selected && selected.length > 0) {
            MobbrInvoice.get({ share_ids: selected }).$promise.then(function (response) {
                $window.saveAs(new $window.Blob([ response.data ], { type: response.type }), 'mobbr-invoices.zip');
            });
        }
    };

    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        if (toState.name !== 'x-payment') {
            setUser();
            $scope.scrollTo('tabletop');
            orderPersons();
        }
    });

    $scope.abs = function (number) {
        return Math.abs(number);
    };

    $scope.payment = payment;
    $scope.selectAll = { selected: false };
});
