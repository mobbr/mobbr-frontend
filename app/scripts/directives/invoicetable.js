'use strict';

angular.module('mobbr.directives').directive('invoicetable', function factory() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: '../../views/directives/invoicetable.html',
        scope: {
            api: '=',
            action: '=',
            buttonText: '=',
            buttonAction: '=',
            emptyMessage: '=',
            columns: '=',
            groupBy: '=',
            selectable: '=',
            sort: '=',
            order: '='
        },
        controller: function ($scope, $attrs, $filter, ngTableParams, PaymentReceipt, userSession) {

            var reqparams = {},
                sorting = {};

            sorting[$scope.sort || 'datetime'] = $scope.order || 'desc';

            if ($scope.action) {
                reqparams.action = $scope.action;
            }

            $scope.labels = {
                username: 'Name',
                worker_username: 'Name',
                role: 'Role',
                currency: 'Currency',
                currency_iso: 'Currency',
                amount: 'Amount',
                expiration: 'Expiration days',
                datetime: 'Date/time',
                title: 'Title'
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
            $scope.userSession = userSession;
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

                        $scope.api(reqparams, function (response) {

                            var data = response.result,
                                filteredData = $scope.invoiceTable.filter() ?
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
            $scope.$on('invoicetable', function (e, args) {

                var broadcast_api = args[0],
                    broadcast_action = args[1];

                if (($scope.api === broadcast_api || broadcast_api === '*') && $scope.action === broadcast_action) {
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