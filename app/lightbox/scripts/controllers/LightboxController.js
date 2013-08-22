'use strict';

angular.module('mobbr.controllers')
    .controller('LightboxController', function ($scope, $location, Gateway) {

        var hash = $location.search()['hash'];

        $scope.loading = false;

        if (hash) {
            Gateway.getPayment({ hash: hash }, function (response) {
                $scope.json = response.result;
                $scope.noscript = $scope.json['participants'] === undefined || $scope.json['participants'].length === 0;
            });
        } else {
            $scope.loading = true;
        }

        $scope.registerPayment = function () {
            Gateway.registerPayment({ referrer: document.referrer || 'http://zaplog.nl', hash: hash }, function (response) {
                $scope.marked = true;
            }, function (response) {
                $scope.errormessage = response.data.message.text;
                $scope.marked = false;
            });
        }
        //$scope.same_domain = strcmp( parse_url( $json['url'], PHP_URL_HOST), parse_url( $referrer, PHP_URL_HOST) ) == 0;
    }
);
