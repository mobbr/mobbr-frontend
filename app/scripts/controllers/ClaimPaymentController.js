'use strict';

angular.module('mobbr.controllers').controller('ClaimPaymentController', function ($scope, Claim, Msg,$location) {

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
        }else if($scope.unclaimedPayments.length > 0 && ($scope.paymentDescription == '' && $scope.isUrl())){
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
            Claim.unclaimedPayments({url:$scope.claimpayment.url},function(response){
                $scope.workingCheck = false;
                if(response.result != null && response.result.length > 0){

                    $scope.unclaimedPayments = response.result;
                    $scope.toggleCheckPayments();

                    Msg.setResponseMessage( 'info','Found unclaimed payments for ' + $scope.claimpayment.url,response);

                }else if(response.result != null && response.result.length == 0){
                    Msg.setResponseMessage( 'info','We found no payments for ' + $scope.claimpayment.url,response);
                }
                else{
                    Msg.setResponseMessage( 'info','Error fetching unclaimed payments', response);
                }
            },function(response){
                Msg.setResponseMessage( 'error', 'Error fetching unclaimed payments',response);
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

            Claim.paymentDescription({url:$scope.claimpayment.url},function(response){
                    $scope.loadingPaymentDescription = false;
                    if(response.result !== null){

                        $scope.paymentDescription = angular.toJson(response.result);
                        $scope.paymentDescriptionJson = response.result;
                        Msg.setResponseMessage( 'info','Loaded payment script',response);

                    }else{
                        Msg.setResponseMessage( 'error', 'No payment script found',response);
                    }
                },function(respone){
                    Msg.setResponseMessage( 'error', 'No payment script found',response);
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

            Claim.claim({ids:ids,url:$scope.claimpayment.url},function(response){
                if(response.result === true){
                    Msg.setResponseMessage( 'info','Claim successful',response);

                }else{
                    $scope.claiming = false;
                    Msg.setResponseMessage( 'error', 'Could not claim payments',response);
                }
            },function(response){
                $scope.claiming = false;
                Msg.setResponseMessage( 'error', 'Could not claim payments',response);
            });
        }
    }
});