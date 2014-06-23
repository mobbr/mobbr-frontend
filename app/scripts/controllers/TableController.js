'use strict';

angular.module('mobbr.controllers').controller('TableController', function ($scope, $state, $filter, $timeout, ngTableParams, table) {

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

    $scope.buttonActions = [];
    $scope.selectallid = Math.floor(Math.random() * 1000000);
    $scope.groupby = $state.current.data.groupby;
    $scope.sortTableBy = table.sortTableBy;

    $scope.mobbrTable = new ngTableParams(
        {
            page: 1,
            count: 10,
            filter: '',
            sorting: $state.current.data.sorting
        },
        {
            total: function () { return $scope.items.length; },
            groupBy: $state.current.data.groupby || 'null',
            getData: function ($defer, params) {

                table.data.$promise.then(function (response) {

                    var data = response.result;

                    /**
                     * TODO: All assignments below concerning state should be called on state update, not on data reload
                     */

                    $scope.index = $state.current.data.index;
                    $scope.columns = $state.current.data.columns;
                    $scope.groups = $state.current.data.groups;
                    $scope.selectable = $state.current.data.selectable;
                    $scope.empty_message = $state.current.data.empty_message;
                    $scope.buttons = $state.current.data.buttons;
                    $scope.clickRow = $scope[$state.current.data.clickRow];
                    $scope.sorting = $state.current.data.sorting;
                    $scope.selectedIds = [];
                    $scope.selectedItems = [];
                    $scope.checkboxes = { 'checked': false, items: {} };

                    if ($state.current.data.groupby) {
                        $scope.groupby = $state.current.data.groupby;
                    } else if ($scope.groups.indexOf($scope.groupby) === -1) {
                        $scope.groupby = 'null';
                    }

                    if ($scope.index instanceof Array) {
                        for (var i = 0, l = $scope.index.length; i < l; i++) {
                            data = data[$scope.index[i]];
                        }
                    } else if ($scope.index) {
                        data = data[$scope.index]
                    }

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

    table.params = $scope.mobbrTable;

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
    $scope.$watch('groupby', function (old_value, new_value) {
        if (new_value !== undefined && old_value !== undefined && new_value !== old_value) {
            $scope.mobbrTable.settings().groupBy = $scope.groupby;
            $scope.mobbrTable.reload();
        }
    });
});