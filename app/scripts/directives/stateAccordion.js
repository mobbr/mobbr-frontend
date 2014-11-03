angular.module('mobbr.directives').directive('stateAccordion', function factory($state, $rootScope) {
    'use strict';

    return {
        restrict: 'A',
        link: function (scope, elem, attrs, $window) {

            scope.stateAccordion = {};

            function setAccordion() {
                angular.forEach(scope.stateAccordion, function (item, key) {
                    scope.stateAccordion[key] = false;
                });
                scope.stateAccordion[$state.current.name] = true;
            }

            $rootScope.$on('$stateChangeSuccess', setAccordion);
            setAccordion();
        }
    };
});