'use strict';

angular.module('mobbr.directives').directive('pwCheck', function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {

            ctrl.$parsers.unshift(function (viewValue) {

                var firstPassword = '#' + attrs.pwCheck;

                if (viewValue === $(firstPassword).val()) {
                    ctrl.$setValidity('pwCheck', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('pwCheck', false);
                    return undefined;
                }
            });
        }
    }
});
