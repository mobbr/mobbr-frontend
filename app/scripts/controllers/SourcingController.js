'use strict';

angular.module('mobbr.controllers').controller('SourcingController', function ($scope, $dialog, $location, userSession, Dashboard, Sourcing, invoiceDialog, pdfGenerator, Msg) {

    $scope.Sourcing = Sourcing;
    $scope.Dashboard = Dashboard;

    $scope.openPayment = function (item) {
        console.log(item);
        $location.path('/payment/' + (item.payment_id || item.id));
    }

    $scope.cancelInvoices = function (ids, items, table) {
        $scope.ciwaiting = true;
        Sourcing.cancelInvoices({ ids: ids }, function (response) {
            Msg.setResponseMessage('info', 'Invoice request successfully cancelled', response);
            table.reload();
            $scope.$broadcast('invoicetable', 'working_requested_invoices');
            $scope.$broadcast('invoicetable', 'sourcing_unrequested_invoices');
            $scope.ciwaiting = false;
        }, function (response) {
            Msg.setResponseMessage('error', 'Cannot cancel invoice request', response);
            $scope.ciwaiting = true;
        });
    }

    $scope.requestInvoices = function (ids, items, table) {
        invoiceDialog(
            Sourcing.requestInvoices,
            'request_invoice_popup',
            {
                ids: ids,
                customer_name: userSession.user.companyname || (userSession.user.firstname + ' ' + userSession.user.lastname),
                customer_address: userSession.user.address,
                customer_country: userSession.user.country_of_residence,
                customer_vat_number: userSession.user.vat_number,
                customer_vat_rate: userSession.user.vat_rate,
                customer_status: userSession.user.companyname && 'enterprise' || 'private',
                customer_invoice_prefix: userSession.user.invoice_numbering_prefix,
                customer_invoice_postfix: userSession.user.invoice_numbering_postfix
            },
            function (dialog, response) {
                Msg.setResponseMessage('info', 'Invoice successfully requested', response);
                dialog.close();
                $scope.$broadcast('invoicetable', 'sourcing_requested_invoices');
                $scope.$broadcast('invoicetable', 'working_requested_invoices');
                table.reload();
            },
            function (dialog, response) {
                Msg.setResponseMessage('error', 'Cannot request invoice', response);
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
            Dashboard.revokePledge,
            'remove_pledges_popup',
            { ids: ids },
            function (dialog, response) {
                Msg.setResponseMessage('info', 'Pledges succesfully deleted', response);
                dialog.close();
                table.reload();
            },
            function (dialog, response) {
                Msg.setResponseMessage('error', response.data.message.text, response);
            }
        ).open();
    }
});