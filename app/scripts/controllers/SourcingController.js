'use strict';

angular.module('mobbr.controllers').controller('SourcingController', function ($scope, $dialog, $location, $rootScope, invoiceDialog, pdfGenerator, MobbrInvoice, MobbrPayment, MobbrPerson, MobbrUri) {

    $scope.MobbrInvoice = MobbrInvoice;
    $scope.MobbrPayment = MobbrPayment;
    $scope.MobbrPerson = MobbrPerson;
    $scope.MobbrUri = MobbrUri;

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

    $scope.requestInvoices = function (ids, items, table) {
        invoiceDialog(
            MobbrInvoice.request,
            'request_invoice_popup',
            {
                ids: ids,
                customer_name: $rootScope.$mobbrStorage.user.companyname || ($rootScope.$mobbrStorage.user.firstname + ' ' + $rootScope.$mobbrStorage.user.lastname),
                customer_address: $rootScope.$mobbrStorage.user.address,
                customer_country: $rootScope.$mobbrStorage.user.country_of_residence,
                customer_vat_number: $rootScope.$mobbrStorage.user.vat_number,
                customer_vat_rate: $rootScope.$mobbrStorage.user.vat_rate,
                customer_status: $rootScope.$mobbrStorage.user.companyname && 'enterprise' || 'private'
            },
            function (dialog, response) {
                dialog.close();
                $scope.$broadcast('invoicetable', 'sourcing_requested_invoices');
                $scope.$broadcast('invoicetable', 'working_requested_invoices');
                $scope.$broadcast('invoicetable', 'sourcing_unrequested_invoices');
            }
        ).open();
    }

    $scope.downloadInvoices = function (ids, items) {
        angular.forEach(items, function (item) {
            pdfGenerator.generate(item);
        });
    }

    $scope.removePledgesDialog = function (ids, items, table) {
        invoiceDialog(
            MobbrPayment.unpledge,
            'remove_pledges_popup',
            { ids: ids },
            function (dialog, response) {
                dialog.close();
                $scope.$broadcast('invoicetable', 'sourcing_pledges');
            }
        ).open();
    }
});