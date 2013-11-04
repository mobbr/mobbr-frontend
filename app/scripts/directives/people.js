'use strict';

angular.module('mobbr.directives').directive('people', function factory() {
    return {
        restrict: 'E',
        replace: true,
        transclude:true,
        templateUrl: '../../views/directives/people.html',
        scope: {
            people:'=',
            title:'@',
            nodatatitle:'@',
            persontitle:'@',
            showamount:'@',
            ownsearch:'@'
        },
        controller: function ($scope, $attrs) {

            $scope.sortEntries;                  // sort on column
            $scope.sortOrder = 'false';            // sort order
            $scope.showentries = 10;

            $scope.sortPeople = function (column) {
                if (column == $scope.sortEntries) {
                    $scope.sortOrder = $scope.sortOrder == 'true' ? 'false' : 'true';
                } else {
                    $scope.sortEntries = column;
                    $scope.sortOrder = 'false';
                }
            }

        }
    }
});