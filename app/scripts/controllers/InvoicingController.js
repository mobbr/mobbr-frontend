'use strict';

angular.module('mobbr.controllers').controller('InvoicingController', function ($scope, $state, $location, $rootScope, $modal, $filter, pdfGenerator, MobbrInvoice, MobbrPayment, table) {

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
        role: 'Role',
        currency_iso: 'Currency'
    };

    $scope.selectallid = Math.floor(Math.random() * 1000000);
    $scope.selectedIds = [];
    $scope.selectedItems = [];
    $scope.checkboxes = { 'checked': false, items: {} };
    $scope.groupby = 'uri';
    $scope.columns = $state.current.data.columns || [ 'title', 'username', 'role', 'currency_iso', 'amount' ];
    $scope.groups = $state.current.data.columns ||  [ 'uri', 'username', 'role', 'currency_iso' ];
    $scope.buttonText = $state.current.data.buttonText;
    $scope.empty_message =  $state.current.data.emptyMessage || 'No items available';
    $scope.invoiceTable = table.getTableParams($scope);

    $scope.openPayment = function (item) {
        $location.path('/payment/' + (item.payment_id || item.id));
    }

    $scope.cancelInvoices = function (ids, items, table) {
        $scope.ciwaiting = true;
        MobbrInvoice.unrequest({ ids: ids }, function (response) {
            $scope.ciwaiting = false;
        }, function (response) {
            $scope.ciwaiting = true;
        });
    }

    $scope.requestInvoices = function (ids) {
        return $modal.open({
            backdrop: true,
            keyboard: true,
            backdropClick: false,
            templateUrl: 'views/partials/request_invoice_popup.html',
            controller: function ($scope) {
                $scope.invoice = {
                    ids: ids,
                    customer_name: $rootScope.$mobbrStorage.user.companyname || (($rootScope.$mobbrStorage.user.firstname || '') + ' ' + ($rootScope.$mobbrStorage.user.lastname || '')),
                    customer_address: $rootScope.$mobbrStorage.user.address,
                    customer_country: $rootScope.$mobbrStorage.user.country_of_residence,
                    customer_vat_number: $rootScope.$mobbrStorage.user.vat_number,
                    customer_vat_rate: $rootScope.$mobbrStorage.user.vat_rate,
                    customer_status: $rootScope.$mobbrStorage.user.companyname && 'enterprise' || 'private'
                }

                $scope.confirm = function (result) {
                    MobbrInvoice.request(result, function () {
                        $scope.$close();
                    });
                };
            }
        });
    }

    $scope.confirmInvoices = function (ids, items, table) {
        return $modal.open({
            backdrop: true,
            keyboard: true,
            backdropClick: false,
            templateUrl: 'views/partials/confirm_invoice_popup.html',
            controller: function ($scope) {
                $scope.invoice = {
                    ids: ids,
                    worker_name: $rootScope.$mobbrStorage.user.companyname || (($rootScope.$mobbrStorage.user.firstname || '') + ' ' + ($rootScope.$mobbrStorage.user.lastname || '')),
                    worker_address: $rootScope.$mobbrStorage.user.address,
                    worker_country: $rootScope.$mobbrStorage.user.country_of_residence,
                    worker_vat_number: $rootScope.$mobbrStorage.user.vat_number,
                    worker_vat_rate: $rootScope.$mobbrStorage.user.vat_rate,
                    worker_status: $rootScope.$mobbrStorage.user.companyname && 'enterprise' || 'private',
                    worker_invoice_prefix: $rootScope.$mobbrStorage.user.invoice_numbering_prefix,
                    worker_invoice_postfix: $rootScope.$mobbrStorage.user.invoice_numbering_postfix
                }

                $scope.confirm = function (result) {
                    MobbrInvoice.confirm(result, function () {
                        $scope.$close();
                    });
                };
            }
        });
    }

    $scope.downloadInvoices = function (ids, items) {
        angular.forEach(items, function (item) {
            pdfGenerator.generate(item);
        });
    }

    $scope.buttonAction = function (ids, items, table) {

        var promise = $scope[$state.current.data.buttonAction](ids, items, table);

        if (promise) {
            promise.result.then(function () {
                $scope.invoiceTable.reload();
            });
        }
    }

    $scope.$watch('groupby', function (value) {
        $scope.invoiceTable.settings().groupBy = value;
        $scope.invoiceTable.reload();
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
});