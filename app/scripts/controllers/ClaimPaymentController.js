'use strict';

angular.module('mobbr.controllers').controller('ClaimPaymentController', function ($scope, MobbrPayment, MobbrScript, mobbrMsg) {

    $scope.claimpayment = {url: ''};

    $scope.loadingPaymentDescription = false;

    $scope.url = false;
    $scope.isUrl = function(){
        return $scope.url;
    }


    $scope.$watch('claimpayment.url', function(newValue, oldValue) {
        $scope.reset();
    });


    $scope.reset = function(){
        $scope.paymentDescription = '';
        $scope.unclaimedPayments = null;
        $scope.searchEntries = null;
        $scope.sortEntries = 'url';
        $scope.loadingPaymentDescription = false;
        $scope.paymentDescriptionJson = null;
    }

    $scope.step = function (){
        if($scope.claimpayment.url == '' || $scope.unclaimedPayments == undefined){
            return 1;
        }else if($scope.unclaimedPayments.length && $scope.unclaimedPayments.length > 0 && ($scope.paymentDescription == '' && $scope.isUrl())){
            return 3;
        }
        else{
            return 4;
        }
    }

    $scope.searchEntries;
    $scope.showEntries = 10;
    $scope.unclaimedPayments;
    $scope.sortEntries = 'url';
    $scope.sortOrder = true;
    $scope.workingCheck = false;
    $scope.retrieveUnclaimedPaynents = function () {
        $scope.reset();

        $scope.url = !validateEmail($scope.claimpayment.url);

        if ($scope.claimpayment.url != null && $scope.claimpayment.url.length > 0) {
            $scope.workingCheck = true;
            // determine if url is url of email
            MobbrPayment.unclaimed({ url_or_email: $scope.claimpayment.url }, function (response){
                $scope.workingCheck = false;
                if(response.result.length > 0){
                    $scope.unclaimedPayments = response.result;
                    $scope.toggleCheckPayments();
                } else {
                    mobbrMsg.add({ msg: 'No unclaimed payments found' });
                }
            },function(response){
                $scope.workingCheck = false;
            });

        }
    }

    $scope.toggleCheckPayments = function () {
        for (var i = 0; i < $scope.unclaimedPayments.length; i++) {
            var payment = $scope.unclaimedPayments[i];
            payment['checked'] = true;
        }
    }



    $scope.paymentDescription = '';

    $scope.retrievePaymentDescription = function () {
        $scope.paymentDescriptionJson = null;
        if ($scope.claimpayment.url != null) {
            $scope.loadingPaymentDescription = true;

            MobbrScript.get({url:$scope.claimpayment.url},function(response){
                    $scope.loadingPaymentDescription = false;
                    if(response.result !== null){

                        $scope.paymentDescription = angular.toJson(response.result);
                        $scope.paymentDescriptionJson = response.result;
                    }
                },function(respone){
                    $scope.loadingPaymentDescription = false;
                }

            );
        }
    }

    $scope.claiming = false;

    $scope.claim = function () {
        $scope.claiming = true;
        if ($scope.paymentDescriptionJson != null &&  $scope.unclaimedPayments.length > 0) {
            var ids = [];
            for(var i =0;i<$scope.unclaimedPayments.length;i++){
                var payment = $scope.unclaimedPayments[i];
                if(payment.checked){
                    ids.push(payment.id);
                }
            }

            MobbrPayment.claim({url:$scope.claimpayment.url},function(response){
                $scope.claiming = false;
                if(response.result === true){
                    $scope.claimpayment.url = '';
                    $scope.unclaimedPayments = null;
                    $scope.paymentDescription = '';
                }
            },function(response){
                $scope.claiming = false;
            });
        }
    }
});