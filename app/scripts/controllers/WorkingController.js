'use strict';

angular.module('mobbr.controllers').controller('WorkingController', function ($scope, $location, $filter, $rootScope, MobbrInvoice, MobbrPayment, MobbrUri, invoiceDialog, pdfGenerator) {

    $scope.MobbrInvoice = MobbrInvoice;
    $scope.MobbrPayment = MobbrPayment;
    $scope.MobbrUri = MobbrUri;

    $scope.unclaimed = MobbrUri.unclaimed();
    $scope.earned = MobbrUri.earned();
    $scope.confirmable = MobbrInvoice.confirmable();
    $scope.confirmed = MobbrInvoice.confirmed();

    $scope.openPayment = function (item) {
        $location.path('/payment/' + (item.payment_id || item.id));
    }

    $scope.confirmInvoices = function (ids, items, table) {
        invoiceDialog(
            MobbrInvoice.confirm,
            'confirm_invoice_popup',
            {
                ids: ids,
                worker_name: $rootScope.$mobbrStorage.user.companyname || (($rootScope.$mobbrStorage.user.firstname || '') + ' ' + ($rootScope.$mobbrStorage.user.lastname || '')),
                worker_address: $rootScope.$mobbrStorage.user.address,
                worker_country: $rootScope.$mobbrStorage.user.country_of_residence,
                worker_vat_number: $rootScope.$mobbrStorage.user.vat_number,
                worker_vat_rate: $rootScope.$mobbrStorage.user.vat_rate,
                worker_status: $rootScope.$mobbrStorage.user.companyname && 'enterprise' || 'private',
                worker_invoice_prefix: $rootScope.$mobbrStorage.user.invoice_numbering_prefix,
                worker_invoice_postfix: $rootScope.$mobbrStorage.user.invoice_numbering_postfix
            },
            function (dialog, response) {
                dialog.close();
                $scope.$broadcast('invoicetable', 'working_requested_invoices');
                $scope.$broadcast('invoicetable', 'working_reviewed_invoices');
                $scope.$broadcast('invoicetable', 'sourcing_reviewed_invoices');
            }
        );
    }

    $scope.downloadInvoices = function (ids, items) {
        angular.forEach(items, function (item) {
            pdfGenerator.generate(item);
        });
    }
});
