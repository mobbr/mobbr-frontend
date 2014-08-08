'use strict';

angular.module('mobbr.directives').directive('mtable', function factory($filter, ngTableParams) {

    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: 'views/directives/mtable.html',
        scope: {
            columns: '=',
            groups: '=',
            groupBy: '@',
            selectable: '=',
            empty_message: '@',
            buttons: '@',
            clickRow: '=',
            sorting: '=',
            data: '=',
            buttonActions: '='
        },
        controller: function ($scope, $attrs) {

            $scope.labels = {
                username: 'Name',
                worker_username: 'Name',
                expiration: 'Expiration days',
                datetime: 'Date/time',
                paiddatetime: 'Date/time',
                announceddatetime: 'Date/time',
                payment_service: 'Payment service',
                receive_address: 'Receive address',
                currency_description: 'Currency description',
                gravatar: ' ',
                uri: 'URL',
                url: 'URL',
                role: 'Role',
                currency_iso: 'Currency'
            };

            $scope.grouplabels = {
                username: 'Group by name',
                worker_username: 'Group by name',
                uri: 'Group by URL',
                url: 'Group by URL',
                role: 'Group by role',
                currency_iso: 'Group by currency',
                null: 'No grouping'
            };

            $scope.selectallid = Math.floor(Math.random() * 1000000);

            $scope.mobbrTable = new ngTableParams(
                {
                    page: 1,
                    count: 10,
                    filter: '',
                    sorting: $scope.sorting
                },
                {
                    total: 0,
                    groupBy: $scope.groupBy,
                    getData: function ($defer, params) {

                        $scope.data.$promise.then(function (response) {

                            var data = response.result;

                            params.total(data.length);
                            $scope.selectedIds = [];
                            $scope.selectedItems = [];
                            $scope.checkboxes = { 'checked': false, items: {} };

                            var filteredData = params.filter() ?
                                    $filter('filter')(data, params.filter()) :
                                    data,
                                orderedData = params.sorting() ?
                                    $filter('orderBy')(filteredData, params.orderBy()) :
                                    filteredData;

                            $defer.resolve($scope.items = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));

                        }, function () {

                            $defer.reject();
                        });
                    }
                }
            );

            $scope.sortTableBy = function (column) {

                var sorting;

                if (typeof column === 'object') {
                    sorting = column;
                } else if (column === false) {
                    sorting = column
                } else {
                    sorting = {};
                    sorting[column] = $scope.mobbrTable.isSortBy(column, 'asc') ? 'desc' : 'asc';
                }

                $scope.mobbrTable.sorting(sorting);
            }

            $scope.buttonAction = function (action, table, ids, items) {
                if ($scope.buttonActions[action]) {

                    var promise = $scope.buttonActions[action](ids, items, table);

                    if (promise) {
                        promise.result.then(function () {
                            $scope.mobbrTable.reload();
                        });
                    }
                }
            }

            // watch for check all checkbox
            $scope.$watch('select_all', function (value) {
                angular.forEach($scope.items, function (item) {
                    $scope.checkboxes.items[item.id] = value;
                });
            });

            // watch for data checkboxes
            $scope.$watch('checkboxes.items', function (values) {

                if (!$scope.items) {
                    return;
                }

                var checked = 0,
                    unchecked = 0,
                    total = $scope.items.length;

                angular.forEach($scope.items, function (item) {

                    var indexId = $scope.selectedIds.indexOf(item.id),
                        indexItem = $scope.selectedItems.indexOf(item);

                    if ($scope.checkboxes.items[item.id]) {
                        checked++;
                        indexId === -1 && $scope.selectedIds.push(item.id);
                        indexItem === -1 && $scope.selectedItems.push(item);
                    } else {
                        unchecked++;
                        indexId !== -1 && $scope.selectedIds.splice(indexId, 1);
                        indexItem !== -1 && $scope.selectedItems.splice(indexItem, 1);
                    }
                });

                if ((unchecked == 0) || (checked == 0)) {
                    $scope.checkboxes.checked = (checked == total);
                }

                angular.element(document.getElementById($scope.selectallid)).prop("indeterminate", (checked != 0 && unchecked != 0));

            }, true);

            // watch for groupby value
            $scope.$watch('groupBy', function (old_value, new_value) {
                if (new_value !== undefined && new_value !== old_value) {
                    $scope.mobbrTable.settings().groupBy = $scope.groupBy;
                    $scope.mobbrTable.reload();
                }
            });
        }
    }
});