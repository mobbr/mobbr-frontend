'use strict';

angular.module('mobbr.controllers').controller('SourcingController', function ($scope, $filter, $location, $window, userSession, Dashboard, Sourcing, ngTableParams, invoiceDialog, pdfGenerator, Msg) {

    $scope.persons = Sourcing.persons();
    $scope.selectedPledges = {};

    $scope.openUrl = function (url) {
        $location.path('/url/' + $window.btoa(url));
    }

    $scope.numSelected = function (object) {

        var count = 0;

        angular.forEach(object, function (item) {
            count += item;
        });

        return count;
    }

    $scope.deletePayments = function (payments) {

        var deleteArray = [];

        angular.forEach(payments, function (payment, id) {
            payment && deleteArray.push(id);
        });

        Dashboard.deletePayment({ "ids": deleteArray}, function (response) {
            $scope.working = false;
            $scope.pledgesTable.reload();
        });
    }

    $scope.cancelInvoices = function (ids) {
        Sourcing.cancelInvoices({ ids: ids }, function (response) {
            Msg.setResponseMessage('info', 'Invoice request successfully cancelled', response);
            $scope.$broadcast('invoicetable', [ 'sourcing', 'requested' ]);
            $scope.$broadcast('invoicetable', [ 'working', 'requested' ]);
            $scope.$broadcast('invoicetable', [ 'sourcing', 'unrequested' ]);
        }, function (response) {
            Msg.setResponseMessage('error', 'Cannot cancel invoice request', response);
        });
    }

    $scope.requestInvoices = function (ids) {
        invoiceDialog('sourcing', 'requestInvoices', ids, function (dialog, response) {
            Msg.setResponseMessage('info', 'Invoice successfully requested', response);
            dialog.close();
            $scope.$broadcast('invoicetable', [ 'sourcing', 'requested' ]);
            $scope.$broadcast('invoicetable', [ 'working', 'requested' ]);
            $scope.$broadcast('invoicetable', [ 'sourcing', 'unrequested' ]);
        }, function (dialog, response) {
            Msg.setResponseMessage('error', 'Cannot request invoice', response);
        }).open();
    }

    $scope.downloadInvoices = function (ids, items) {
        angular.forEach(items, function (item) {
            pdfGenerator.generate(item);
        });
    }

    $scope.pledgesTable = new ngTableParams(
        {
            page: 1,
            count: 0
        },
        {
            counts: [],
            groupBy: 'domain',
            total: 0,
            getData: function ($defer, params) {
                Dashboard.getPayments({ action: 'unclaimed_payments' }, function (response) {

                    var data = response.result,
                        orderedData = params.sorting() ? $filter('orderBy')(data, $scope.pledgesTable.orderBy()) : data;

                    $scope.pledgesTable.$params.count = data.length;
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                });
            }
        }
    );

    $scope.tasksTable = new ngTableParams(
        {
            page: 1,
            count: 0
        },
        {
            counts: [],
            groupBy: 'title',
            total: 0,
            getData: function ($defer, params) {
                Sourcing.urls(function (response) {

                    var data = response.result,
                        orderedData = params.sorting() ? $filter('orderBy')(data, $scope.tasksTable.orderBy()) : data;

                    $scope.tasksTable.$params.count = data.length;
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                });
            }
        }
    );
});