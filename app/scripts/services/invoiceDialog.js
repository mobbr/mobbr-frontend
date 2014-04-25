'use strict';

angular.module('mobbr.services.invoice', []).factory('invoiceDialog', function ($modal) {

        return function (method, template, params, onSuccess, onError) {

            var modalInstance = $modal.open({
                backdrop: true,
                keyboard: true,
                backdropClick: false,
                templateUrl: 'views/partials/' + template + '.html',
                controller: function ($scope) {

                    $scope.invoice = {};

                    angular.forEach(params, function (item, key) {
                        $scope.invoice[key] = item;
                    });

                    $scope.close = function () {
                        modalInstance.dismiss('cancel');
                    }

                    $scope.confirm = function () {
                        modalInstance.close($scope);
                    }
                }
            });

            modalInstance.result.then(function ($scope) {

                $scope.waiting = true;

                method($scope.invoice, function (response) {
                    $scope.waiting = false;
                    onSuccess && onSuccess(modalInstance, response);
                }, function (response) {
                    $scope.waiting = false;
                    onError && onError(modalInstance, response);
                });
            });

            return modalInstance;
        }
    }
);