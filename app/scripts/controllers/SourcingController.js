'use strict';

angular.module('mobbr.controllers').controller('SourcingController', function ($scope, $location, $rootScope, $modal, pdfGenerator, MobbrInvoice, MobbrPayment, MobbrPerson) {

    $scope.requestableInvoices = MobbrInvoice.requestable();
    $scope.requestedInvoices = MobbrInvoice.requested();
    $scope.confirmedInvoices = MobbrInvoice.confirmed();
    $scope.pledged = MobbrPayment.pledged();
    $scope.workers = MobbrPerson.paid();

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