'use strict';

angular.module('mobbr.controllers').controller('SourcingController', function ($scope, $filter, $location, $window, userSession, Claim, Dashboard, Sourcing, ngTableParams) {

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

    $scope.invoice = {
        customer_name: userSession.user.companyname || (userSession.user.firstname + ' ' + userSession.user.lastname),
        customer_address: userSession.user.address,
        customer_country: userSession.user.country_of_residence,
        customer_vat_number: userSession.user.vat_number,
        customer_vat_rate: userSession.user.vat_rate,
        customer_status: userSession.user.companyname && 'enterprise' || 'private'
    }

    $scope.requestInvoices = function (ids) {
        var params = $scope.invoice;
        params.ids = ids;
        Sourcing.requestInvoices(params);
    }

    $scope.cancelInvoices = function (ids) {
        Sourcing.cancelInvoices({ ids: ids });
    }
});