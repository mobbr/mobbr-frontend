'use strict';

angular.module('mobbr.services.invoice', []).factory('invoiceDialog', function ($dialog, userSession, Sourcing, Working) {

        return function (api, method, ids, onSuccess, onError) {

            var Api = api === 'sourcing' ? Sourcing : Working;

            return $dialog.dialog({
                backdrop: true,
                keyboard: true,
                backdropClick: false,
                templateUrl: 'views/partials/invoice_popup.html',
                controller: function ($scope, dialog) {

                    $scope.invoice = {
                        name: userSession.user.companyname || (userSession.user.firstname + ' ' + userSession.user.lastname),
                        address: userSession.user.address,
                        country: userSession.user.country_of_residence,
                        vat_number: userSession.user.vat_number,
                        vat_rate: userSession.user.vat_rate,
                        status: userSession.user.companyname && 'enterprise' || 'private'
                    }

                    $scope.close = function () {
                        dialog.close();
                    }

                    $scope.confirm = function () {

                        var params = $scope.invoice,
                            req_params = {},
                            prefix =  api === 'sourcing' ? 'customer' : 'worker';

                        angular.forEach(params, function (item, key) {
                            req_params[prefix + '_' + key] = item;
                        });

                        req_params.ids = ids;
                        Api[method](req_params, function (response) {
                            onSuccess(dialog, response);
                        }, function (response) {
                            onError(dialog, response);
                        });
                    }
                }
            });
        }
    }
);