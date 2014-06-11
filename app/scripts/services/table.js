'use strict';

angular.module('mobbr.services').factory('table', function ($filter, ngTableParams) {

    var $scope,
        data,
        tableParams = new ngTableParams(
        {
            page: 1,
            count: 10,
            sorting: {
                datetime: 'desc'
            },
            filter: ''
        },
        {
            groupBy: 'uri',
            total: 0,
            getData: function ($defer, params) {

                if (data && $scope) {

                    var filteredData = params.filter() ?
                            $filter('filter')(data, params.filter()) :
                            data,
                        orderedData = params.sorting() ?
                            $filter('orderBy')(filteredData, params.orderBy()) :
                            filteredData;

                    params.total(orderedData.length);
                    $defer.resolve($scope.items = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));

                } else {

                    $defer.reject();
                }
            }
        }
    );

    return {
        reload: function (new_data) {
            data = new_data;
            tableParams.reload();
        },
        getTableParams: function (new_scope) {
            $scope = new_scope;
            return tableParams;
        }
    };
});
