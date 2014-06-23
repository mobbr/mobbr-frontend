'use strict';

angular.module('mobbr.controllers').controller('InvoicingController', function ($scope, $state, $location, $rootScope, $modal, $filter, pdfGenerator, MobbrInvoice, table) {

    $scope.buttonActions.cancelInvoices = function (ids) {
        $scope.ciwaiting = true;
        MobbrInvoice.unrequest({ ids: ids }, function () {
            $scope.ciwaiting = false;
            table.reload();
        }, function () {
            $scope.ciwaiting = true;
        });
    }

    $scope.buttonActions.requestInvoices = function (ids) {
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
                        table.reload();
                    });
                };
            }
        });
    }

    $scope.buttonActions.confirmInvoices = function (ids, items, table) {
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
                        table.reload();
                    });
                };
            }
        });
    }

    $scope.buttonActions.downloadInvoices = function (ids, items) {
        angular.forEach(items, function (item) {
            pdfGenerator.generate(item);
        });
    }
});