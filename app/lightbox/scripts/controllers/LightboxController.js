'use strict';

angular.module('mobbr.controllers')
    .controller('LightboxController', function ($scope, $location, Gateway) {

        var hash,
            error;

        function check() {
            error = $location.search()['error'];
            hash = $location.search()['hash'];
            console.log('url change in de lightbox', error, hash);
            if (error) {
                $scope.loading = false;
                $scope.errormessage = error;
                $scope.marked = false;
            } else if (hash) {
                Gateway.getPayment({ hash: hash }, function (response) {
                    $scope.json = response.result;
                    $scope.noscript = $scope.json['participants'] === undefined || $scope.json['participants'].length === 0;
                    $scope.loading = false;
                });
            } else {
                $scope.loading = true;
                $scope.marked = undefined;
                $scope.json = undefined;
                $scope.noscript = undefined;
            }
        }
        $scope.$on('$locationChangeSuccess', check);

        $scope.registerPayment = function () {
            Gateway.registerPayment({ referrer: document.referrer || 'http://zaplog.nl', hash: hash }, function (response) {
                $scope.marked = true;
            }, function (response) {
                $scope.errormessage = response.data && response.data.message && response.data.message.text;
                $scope.marked = false;
            });
        }
        //$scope.same_domain = strcmp( parse_url( $json['url'], PHP_URL_HOST), parse_url( $referrer, PHP_URL_HOST) ) == 0;
    }
);
