angular.module('mobbr.directives').directive('stateAccordion', function factory($state, $rootScope) {
    'use strict';

    return {
        restrict: 'A',
        link: function (scope, elem, attrs, $window) {

            scope.stateAccordion = {};

            function setAccordion() {
                scope.stateAccordion[$state.current.name] = true;
            }

            scope.$watch('stateAccordion', function (newValue, oldValue) {

                var open = false;

                angular.forEach(scope.stateAccordion, function (item, key) {
                    open = item ? key : open;
                });

                if (open && $state.current.name !== open) {
                    $state.go(open);
                } else if (!open) {
                    $state.go(attrs.stateAccordion);
                }

            }, true);

            $rootScope.$on('$stateChangeSuccess', setAccordion);
            setAccordion();
        }
    };
});