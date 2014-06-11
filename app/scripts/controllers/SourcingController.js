'use strict';

angular.module('mobbr.controllers').controller('SourcingController', function ($scope, $state, $location, $rootScope, $modal, pdfGenerator, MobbrInvoice, MobbrPayment) {

    $scope.openPayment = function (item) {
        $location.path('/payment/' + (item.payment_id || item.id));
    }

    $scope.cancelInvoices = function (ids, items, table) {
        $scope.ciwaiting = true;
        MobbrInvoice.unrequest({ ids: ids }, function (response) {
            $scope.$broadcast('invoicetable', 'sourcing_requested_invoices');
            $scope.$broadcast('invoicetable', 'working_requested_invoices');
            $scope.$broadcast('invoicetable', 'sourcing_unrequested_invoices');
            $scope.ciwaiting = false;
        }, function (response) {
            $scope.ciwaiting = true;
        });
    }

    $scope.requestInvoices = function (ids) {
        $modal.open({
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
            }
        }).result.then(function (result) {
                MobbrInvoice.request(result, function() {
                    $scope.$broadcast('invoicetable', 'sourcing_requested_invoices');
                    $scope.$broadcast('invoicetable', 'working_requested_invoices');
                    $scope.$broadcast('invoicetable', 'sourcing_unrequested_invoices');
                });
            }
        );
    }

    $scope.confirmInvoices = function (ids, items, table) {
        $modal.open({
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
            }
        }).result.then(function (result) {
                MobbrInvoice.confirm(result, function() {
                    $scope.$broadcast('invoicetable', 'working_requested_invoices');
                    $scope.$broadcast('invoicetable', 'working_reviewed_invoices');
                    $scope.$broadcast('invoicetable', 'sourcing_reviewed_invoices');
                });
            }
        );
    }

    $scope.downloadInvoices = function (ids, items) {
        angular.forEach(items, function (item) {
            pdfGenerator.generate(item);
        });
    }

    $scope.removePledgesDialog = function (ids) {
        $modal.open({
            backdrop: true,
            keyboard: true,
            backdropClick: false,
            templateUrl: 'views/partials/remove_pledges_popup.html',
            controller: function ($scope) {
                $scope.ids = ids;
            }
        }).result.then(function (result) {
                MobbrPayment.unpledge({ ids: result }, function() {
                    $rootScope.$emit('invoicetable', 'sourcing_pledges')
                });
            }
        );
    }
});