angular.module('mobbr.controllers').controller('PaymentReceiptController', function ($scope, $stateParams, $state, mobbrSession, MobbrPayment, MobbrXPayment, MobbrInvoice, filterFilter, $window) {
    'use strict';

    function orderPersons() {

        $scope.unclaimed = false;
        $scope.userAmount = 0;
        $scope.userPaid = 0;
        $scope.recieversAndSenders = [];

        angular.forEach($scope.payment.result.senders, function (sender) {
            if (sender.username && $scope.thisUser && sender.username.toUpperCase() === $scope.thisUser.toUpperCase()) {
                sender.primary = 1;
                $scope.userPaid += parseFloat(sender.amount);
            } else {
                sender.primary = 0;
            }
            $scope.recieversAndSenders.push(sender);
        });

        angular.forEach($scope.payment.result.receivers, function (reciever) {
            if ((reciever.username && $scope.thisUser && reciever.username.toUpperCase() === $scope.thisUser.toUpperCase()) || ($scope.thisUser && reciever.unclaimed && reciever.unclaimed.toUpperCase() === $scope.thisUser.toUpperCase())) {
                reciever.primary = 1;
                $scope.userAmount += parseFloat(reciever.amount);
                if (reciever.unclaimed) {
                    $scope.unclaimed = true;
                }
            } else {
                reciever.primary = 0;
            }
            $scope.recieversAndSenders.push(reciever);
        });
    }

    function retrievePayment() {
        if ($state.includes('x-payment')) {
            $scope.payment = MobbrXPayment.info({ id: $stateParams.id });
        } else {
            $scope.payment = MobbrPayment.info({ id: $stateParams.id }, orderPersons);
        }
    }

    function setUser() {
        $scope.thisUser = $state.params.username ? $state.params.username : mobbrSession.isAuthorized() && $scope.$mobbrStorage.user.username;
    }

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

    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        setUser();
        $scope.scrollTo('tabletop');
        $scope.payment.$resolved && orderPersons();
    });

    $scope.abs = function (number) {
        return Math.abs(number);
    }

    retrievePayment();
    $scope.selectAll = { selected: false };
});
