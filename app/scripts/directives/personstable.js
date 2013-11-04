'use strict';

angular.module('mobbr.directives').directive('personstable', function factory() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: '../../views/directives/payments.html',
        scope: {
            payments:'='
        },
        controller: function ($scope, $attrs,$rootScope,$location,Msg,userSession) {

            $scope.showentries = 10;             // filter the number of entries
            $scope.sortEntries;                  // sort on column
            $scope.sortOrder = 'false';            // sort order
            $scope.working = false;
            $scope.initializing = true;

            // Waarden overnemen uit attribuut
            $scope.title = $attrs.title;
            $scope.nodatatitle = $attrs.nodatatitle;
            $scope.editable = false;
            $scope.showExpiresDate = $attrs.showexpiresdate == 'true';
            $scope.showSearchEntriesDirective = true;

            $scope.canFinalize = function () {
                return false;
            };

            $scope.sortPayments = function (column) {
                if (column == $scope.sortEntries) {
                    $scope.sortOrder = $scope.sortOrder == 'true' ? 'false' : 'true';
                } else {
                    $scope.sortEntries = column;
                    $scope.sortOrder = 'false';
                }
            }

            $scope.openPayment = function(id){
                $location.path('/payment/' + id);
            }

            $scope.dateHeader = function(){
                if($scope.showExpiresDate){
                    return 'Expire date';
                }
                return 'date/time';
            }
        }
    }
});