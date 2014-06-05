'use strict';

angular.module('mobbr.directives').directive('invoicetable', function factory() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: 'views/directives/invoicetable.html',
        scope: {
            id: '@id',
            api: '=',
            action: '=',
            buttonText: '=',
            buttonAction: '=',
            emptyMessage: '=',
            columns: '=',
            groupBy: '=',
            selectable: '=',
            sortBy: '=',
            sortOrder: '=',
            clickRow: '=',
            showSearch: '=',
            index: '='
        },
        controller: function ($scope, $attrs, $rootScope, $filter, ngTableParams) {

            var reqparams = {},
                sorting = {};

            $scope.$rootScope = $rootScope;

            sorting[$scope.sortBy || 'datetime'] = $scope.sortOrder || 'desc';

            console.log(sorting);

            if ($scope.action) {
                reqparams.action = $scope.action;
            }

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
                gravatar: ' '
            };

            $scope.sortTableBy = function (column) {
                sorting = {};
                sorting[column] = $scope.invoiceTable.isSortBy(column, 'asc') ? 'desc' : 'asc';
                $scope.invoiceTable.sorting(sorting);
            }

            $scope.selectallid = Math.floor(Math.random() * 1000000);
            $scope.selectedIds = [];
            $scope.selectedItems = [];
            $scope.empty_message = $scope.emptyMessage || 'No items available';
            $scope.checkboxes = { 'checked': false, items: {} };
            $scope.invoiceTable = new ngTableParams(
                {
                    page: 1,
                    count: 10,
                    sorting: sorting,
                    filter: ''
                },
                {
                    groupBy: $scope.groupBy,
                    total: 0,
                    getData: function ($defer, params) {

                        $scope.api.$promise.then(function (response) {

                            var data;

                            if ($scope.index instanceof Array) {
                                data = response.result;
                                for (var i = 0, l = $scope.index.length; i < l; i++) {
                                    data = data[$scope.index[i]];
                                }
                            } else if ($scope.index) {
                                data = response.result[$scope.index]
                            } else {
                                data = response.result;
                            }

                            var filteredData = $scope.invoiceTable.filter() ?
                                    $filter('filter')(data, $scope.invoiceTable.filter()) :
                                    data,
                                orderedData = $scope.invoiceTable.sorting() ?
                                    $filter('orderBy')(filteredData, $scope.invoiceTable.orderBy()) :
                                    filteredData;

                            $scope.invoiceTable.total(orderedData.length);
                            $defer.resolve($scope.items = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        });
                    }
                }
            );

            // wait for reload event
            $scope.$on('invoicetable', function (e, id) {
                console.log($scope.id, id);
                if ($scope.id === id) {
                    angular.forEach($scope.checkboxes.items, function (item, key) {
                        $scope.checkboxes.items[key] = false;
                    });
                    $scope.invoiceTable.reload();
                }
            });

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
        }
    }
});