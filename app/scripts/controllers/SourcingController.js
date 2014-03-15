'use strict';

angular.module('mobbr.controllers').controller('SourcingController', function ($scope, $filter, $location, $window, Claim, Sourcing, ngTableParams) {

    $scope.persons = Sourcing.persons();
    $scope.pledges = Claim.unclaimedPayments();
    $scope.urlParams = new ngTableParams(
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
                        orderedData = params.sorting() ? $filter('orderBy')(data, $scope.urlParams.orderBy()) : data;

                    $scope.urlParams.$params.count = data.length;
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                });
            }
        }
    );

    $scope.openUrl = function (url) {
        $location.path('/url/' + $window.btoa(url));
    }
});