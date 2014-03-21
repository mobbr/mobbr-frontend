'use strict';

angular.module('mobbr.controllers').controller('SourcingController', function ($scope, $filter, $dialog, $location, $window, userSession, Dashboard, Sourcing, ngTableParams, invoiceDialog, pdfGenerator, Msg) {

    var ctrlscope = $scope,
        pledgesDialog = $dialog.dialog({
        backdrop: true,
        keyboard: true,
        backdropClick: false,
        templateUrl: 'views/partials/remove_pledges_popup.html',
        controller: function ($scope, dialog) {

            $scope.close = function () {
                dialog.close();
            }

            $scope.confirm = function () {

                var deleteArray = [];

                angular.forEach(ctrlscope.selectedPledges, function (payment, id) {
                    payment && deleteArray.push(id);
                });

                Dashboard.deletePayment({ "ids": deleteArray}, function (response) {
                    dialog.close();
                    pledgesTable.reload();
                }, function (response) {
                    Msg.setResponseMessage('error', response.data.message.text, response);
                });
            }
        }
    });

    $scope.pledgesDialog = pledgesDialog;
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

    var pledgesTable = new ngTableParams(
        {
            page: 1,
            count: 10
        },
        {
            groupBy: 'domain',
            total: 0,
            getData: function ($defer, params) {
                Dashboard.getPayments({ action: 'unclaimed_payments' }, function (response) {

                    var data = response.result,
                        orderedData = params.sorting() ? $filter('orderBy')(data, $scope.pledgesTable.orderBy()) : data;

                    $scope.pledgesTable.total(data.length);
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                });
            }
        }
    );

    $scope.pledgesTable = pledgesTable;

    $scope.tasksTable = new ngTableParams(
        {
            page: 1,
            count: 10
        },
        {
            groupBy: 'title',
            total: 0,
            getData: function ($defer, params) {
                Sourcing.urls(function (response) {

                    var data = response.result,
                        orderedData = params.sorting() ? $filter('orderBy')(data, $scope.tasksTable.orderBy()) : data;

                    $scope.tasksTable.total(data.length);
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                });
            }
        }
    );
});