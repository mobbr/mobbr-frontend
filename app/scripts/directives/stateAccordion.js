angular.module('mobbr.directives').directive('stateAccordion', function factory() {
    'use strict';

    return {
        restrict: 'A',
        controller: function ($scope, $state, $rootScope) {

            $scope.stateAccordion = {};

            function setAccordion() {
                $scope.stateAccordion[$state.current.name] = true;
            }

            $scope.$watch('stateAccordion', function (newValue, oldValue) {

                var open = false;

                angular.forEach($scope.stateAccordion, function (item, key) {
                    open = item ? key : open;
                });

                if (open && $state.current.name !== open) {
                    $state.go(open);
                } else if (!open) {
                    $state.go('settings');
                }

            }, true);

            $rootScope.$on('$stateChangeSuccess', setAccordion);
            setAccordion();
            console.log('we zijn er');
        }
    };
});