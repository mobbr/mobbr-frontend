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
            emptyMessage: '='
        },
        controller: function ($scope, $attrs, $filter, ngTableParams, PaymentReceipt, userSession, Working, Sourcing) {

            var api = $scope.api,
                Api = api === 'sourcing' ? Sourcing : Working,
                invoiceTable = new ngTableParams(
                    {
                        page: 1,
                        count: 0
                    },
                    {
                        counts: [],
                        groupBy: 'title',
                        total: 0,
                        getData: function ($defer, params) {

                            Api.invoices({ action: $scope.action + '_invoices' }, function (response) {

                                var data = response.result,
                                    orderedData = params.sorting() ? $filter('orderBy')(data, invoiceTable.orderBy()) : data;

                                invoiceTable.$params.count = data.length;
                                $defer.resolve($scope.items = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                            });
                        }
                    }
                );

            $scope.selectedIds = [];
            $scope.selectedItems = [];
            $scope.userSession = userSession;
            $scope.empty_message = $scope.emptyMessage || 'No invoices available for the selected timeframe';
            $scope.checkboxes = { 'checked': false, items: {} };
            $scope.numselected = 0;
            $scope.invoiceTable = invoiceTable;

            // wait for reload event
            $scope.$on('invoicetable', function (e, args) {

                var broadcast_api = args[0],
                    broadcast_action = args[1];

                console.log(broadcast_api, broadcast_action);

                if (($scope.api === broadcast_api || broadcast_api === '*') && $scope.action === broadcast_action) {
                    console.log('we reload');
                    $scope.invoiceTable.reload();
                }
            });

            // watch for check all checkbox
            $scope.$watch('checkboxes.checked', function (value) {
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
                        indexItem !== -1 && $scope.selectedIds.splice(indexItem, 1);
                    }
                });

                if ((unchecked == 0) || (checked == 0)) {
                    $scope.checkboxes.checked = (checked == total);
                }

                $scope.numselected = checked;
                angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
            }, true);
        }
    }
});