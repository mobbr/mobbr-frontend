'use strict';

angular.module('mobbr.controllers').controller('DomainController', function ($scope, userSession,Domain,Msg,$location,$routeParams,$rootScope,$window) {

    // payments
    var refarray = document.referrer.split('/');
    $scope.owner = false;

    $scope.payments = [];
    $scope.locations = [];
    $scope.persons = [];
    $scope.balances = [];
    $scope.searchEntries;
    $scope.showentries = 10;             // filter the number of entries
    $scope.sortEntries;                  // sort on column
    $scope.sortOrder = 'false';          // sort order

    $scope.working = false;

    // Waarden overnemen uit attribuut
    $scope.title = 'Payments';
    $scope.nodatatitle = 'No payments';
    $scope.paymenttype = 'payment';
    $scope.editable = false;
    $scope.showExpiresDate = false;

    if (!$routeParams.url) {
        console.log(refarray[0]);
        $location.path('/domain/' + $window.btoa(refarray[0] + '//' + refarray[2])).replace();
    }

    $scope.urlParam = {domain:$window.atob($routeParams.url)};

    Domain.balances($scope.urlParam,function(response){
        $scope.balances = response.result;
    },function(response){});

    Domain.info($scope.urlParam,function(response){
        $scope.info = response.result;
    },function(response){});

    $scope.loadDomainOwner = function(){

        Domain.isDomainOwner($scope.urlParam,function(response){

            if(response.result && response.result === true){
                $scope.owner= true;

                // payments
                Domain.getPayments($scope.urlParam,
                    function (response) {
                        if (response.result != null) {
                            $scope.payments = response.result;
                        } else {
                            Msg.setResponseMessage( 'error', 'Could not get payments', response);
                        }
                    },
                    function (response) {
                        Msg.setResponseMessage( 'error', 'Could not get payments', response);
                    });


                // base currency needed for other calls
                $scope.urlParam['basecurrency'] = userSession.user.currency_iso;

                // locations

                Domain.getLocations($scope.urlParam,function(response){
                    $scope.locations = response.result;
                },function(response){});


                //people
                Domain.getPersons($scope.urlParam,function(response){
                    $scope.persons = response.result;
                },function(response){});
                $scope.persons;
            }else{
                $scope.result= false;

            }
        },function(response){
            $scope.result= false;
            Msg.setResponseMessage( 'error', 'Could not determine domain owner',response);
        });

    }

    $rootScope.$watch('userSession.authenticated', function(newValue, oldValue) {

        if(newValue){
            $scope.loadDomainOwner();
        } else{
            $scope.owner = false;
        }
    } );


    $scope.sortEntriesPeople;                  // sort on column
    $scope.sortOrderPeople = 'false';            // sort order

    $scope.sortPeople = function (column) {
        if (column == $scope.sortEntriesPeople) {
            $scope.sortOrderPeople = $scope.sortOrderPeople == 'true' ? 'false' : 'true';
        } else {
            $scope.sortEntriesPeople = column;
            $scope.sortOrderPeople = 'false';
        }
    }

    $scope.sortEntriesLocations;                  // sort on column
    $scope.sortOrderLocations = 'false';            // sort order

    $scope.sortLocations = function (column) {
        if (column == $scope.sortEntriesLocations) {
            $scope.sortOrderLocations = $scope.sortOrderLocations == 'true' ? 'false' : 'true';
        } else {
            $scope.sortEntriesLocations = column;
            $scope.sortOrderLocations = 'false';
        }
    }

    $scope.openUrl = function(url){
        if(url){
            document.location = url;
        }
    }

});