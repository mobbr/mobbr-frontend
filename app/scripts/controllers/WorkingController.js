'use strict';

angular.module('mobbr.controllers').controller('WorkingController', function ($scope, $filter, userSession, Working, ngTableParams) {

    $scope.urls = Working.urls();
    $scope.personParams = new ngTableParams(
        {
            page: 1,
            count: 0
        },
        {
            counts: [],
            groupBy: 'title',
            total: 0,
            getData: function ($defer, params) {
                Working.persons(function (response) {

                    var data = response.result,
                        orderedData = params.sorting() ? $filter('orderBy')(data, $scope.personParams.orderBy()) : data;

                    $scope.personParams.$params.count = data.length;
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                });
            }
        }
    );

    $scope.invoice = {
        worker_name: userSession.user.companyname || (userSession.user.firstname + ' ' + userSession.user.lastname),
        worker_address: userSession.user.address,
        worker_country: userSession.user.country_of_residence,
        worker_vat_number: userSession.user.vat_number,
        worker_vat_rate: userSession.user.vat_rate,
        worker_status: userSession.user.companyname && 'enterprise' || 'private'
    }

    $scope.confirmInvoices = function (ids) {
        var params = $scope.invoice;
        params.ids = ids;
        Working.confirmInvoices(params);
    }
});
