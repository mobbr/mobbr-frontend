'use strict';

angular.module('mobbr.controllers').controller('PaymentsController', function ($scope, $filter, ngTableParams, MobbrPayment, filterFilter) {

    $scope.filterSelectedIds = function(data) {
        var selected = filterFilter(data, { selected: true });
        if (selected && selected.length > 0) {
            var ids = [];
            angular.forEach(selected, function (elem) {
                ids.push(elem.id);
            });
        }
        return [];
    };

    function createBasicTable(promise, limit) {
        return new ngTableParams({
            page: 1,
            count: limit ? 10 : undefined,
            sorting: {

                name: 'asc'
            }
        }, {
            counts: 10,
            total: 1,
            getData: function ($defer, params) {
                promise.then(function (response) {
                    var data = response.result;
                    var orderedData = params.sorting() ?
                        $filter('orderBy')(data, params.orderBy()) :
                        data;
                    if (params.count() === undefined) {
                        $defer.resolve(orderedData);
                    } else {
                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }

                }, function () {
                    $defer.reject();
                });
            }
        });
    }
    $scope.paymentsTable = createBasicTable(MobbrPayment.get().$promise, true);

    $scope.pledgedTable = createBasicTable(MobbrPayment.pledged().$promise);
    $scope.removePledes = function () {
        var selected = $scope.filterSelectedIds($scope.pledgedTable.data);
        if (selected && selected.length > 0) {
            MobbrPayment.unpledge({ids: selected});
        }
    }

    $scope.unclaimedTable = createBasicTable(MobbrPayment.unclaimed().$promise);


});