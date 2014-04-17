'use strict';

angular.module('mobbr.services.invoice', []).factory('invoiceDialog', function ($dialog) {

        return function (method, template, params, onSuccess, onError) {

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

                    $scope.close = function () {
                        dialog.close();
                    }

                    $scope.confirm = function () {

                        $scope.waiting = true;

                        method($scope.invoice, function (response) {
                            $scope.waiting = false;
                            onSuccess && onSuccess(dialog, response);
                        }, function (response) {
                            $scope.waiting = false;
                            onError && onError(dialog, response);
                        });
                    }
                }
            });
        }
    }
);