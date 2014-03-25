'use strict';

angular.module('mobbr.controllers').controller('WorkingController', function ($scope, $location, $filter, userSession, Working, Global, invoiceDialog, pdfGenerator, Msg) {

    $scope.Working = Working;
    $scope.Global = Global;

    $scope.openPayment = function (id) {
        $location.path('/payment/' + id);
    }

    $scope.confirmInvoices = function (ids, items, table) {
        invoiceDialog(
            Working.confirmInvoices,
            'confirm_invoice_popup',
            {
                ids: ids,
                worker_name: userSession.user.companyname || (userSession.user.firstname + ' ' + userSession.user.lastname),
                worker_address: userSession.user.address,
                worker_country: userSession.user.country_of_residence,
                worker_vat_number: userSession.user.vat_number,
                worker_vat_rate: userSession.user.vat_rate,
                worker_status: userSession.user.companyname && 'enterprise' || 'private',
                worker_invoice_prefix: userSession.user.invoice_numbering_prefix,
                worker_invoice_postfix: userSession.user.invoice_numbering_postfix
            },
            function (dialog, response) {
                Msg.setResponseMessage('info', 'Invoice request confirmed', response);
                dialog.close();
                table.reload()
                $scope.$broadcast('invoicetable', 'working_reviewed_invoices');
                $scope.$broadcast('invoicetable', 'sourcing_reviewed_invoices');
            },
            function (dialog, response) {
                Msg.setResponseMessage('error', 'Cannot confirm invoice request', response);
            }
        ).open();
    }

    $scope.downloadInvoices = function (ids, items) {
        angular.forEach(items, function (item) {
            pdfGenerator.generate(item);
        });
    }
});
