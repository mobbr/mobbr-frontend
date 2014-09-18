angular.module('mobbr.directives').directive('stateAccordion', function factory($state, $rootScope) {
    'use strict';

    return {
        restrict: 'A',
        link: function (scope, elem, attrs, $window) {

            scope.stateAccordion = {};

            function setAccordion() {
                scope.stateAccordion[$state.current.name] = true;
            }

            $rootScope.$on('$stateChangeSuccess', setAccordion);
            setAccordion();
        }
    };
});