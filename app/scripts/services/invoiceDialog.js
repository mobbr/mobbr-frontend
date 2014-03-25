'use strict';

angular.module('mobbr.services.invoice', []).factory('invoiceDialog', function ($dialog, userSession, Sourcing, Working) {

        return function (method, template, params, onSuccess, onError) {

            //var Api = api === 'sourcing' ? Sourcing : Working;

            return $dialog.dialog({
                backdrop: true,
                keyboard: true,
                backdropClick: false,
                templateUrl: 'views/partials/' + template + '.html',
                controller: function ($scope, dialog) {

                    $scope.invoice = {};

                    angular.forEach(params, function (item, key) {
                        $scope.invoice[key] = item;
                    });

                    //$scope.api = api;

                    /*$scope.invoice = {
                        name: userSession.user.companyname || (userSession.user.firstname + ' ' + userSession.user.lastname),
                        address: userSession.user.address,
                        country: userSession.user.country_of_residence,
                        vat_number: userSession.user.vat_number,
                        vat_rate: userSession.user.vat_rate,
                        status: userSession.user.companyname && 'enterprise' || 'private',
                        invoice_prefix: userSession.user.invoice_numbering_prefix,
                        invoice_postfix: userSession.user.invoice_numbering_postfix
                    }*/

                    $scope.close = function () {
                        dialog.close();
                    }

                    $scope.confirm = function () {

                        $scope.waiting = true;

                        method($scope.invoice, function (response) {
                            $scope.waiting = false;
                            onSuccess(dialog, response);
                        }, function (response) {
                            $scope.waiting = false;
                            onError(dialog, response);
                        });
                    }
                }
            });
        }
    }
);