'use strict';

angular.module('mobbr.controllers').controller('WorkingController', function ($scope, $filter, Working, ngTableParams, userSession) {

    console.log(userSession);

    Working.urls(function (response) {
        console.log(response);
    });

    $scope.personParams = new ngTableParams(
        {
            page: 1,
            count: 0
        },
        {
            counts: [],
            groupBy: 'url',
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
});
