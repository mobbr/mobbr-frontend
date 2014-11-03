
angular.module('mobbr.directives').directive('mobbrDateBefore', function () {
    'use strict';

    var toMoment = function(value){
        if(value) {
            if (value instanceof Date) {
                return moment(value);
            } else {
                return moment(value, 'MM-DD-YYYY');
            }
        }
    };

    return {
        restrict: 'A',
        require: 'ngModel',

        link: function (scope, elem, attr, ctrl) {

            var validateFunction = function (value) {
                // test and set the validity after update.
                var given = toMoment(value);
                var before = toMoment(attr.mobbrDateBefore);
                var valid = true;
                if (given && before) {
                    valid = given.isBefore(before, 'day') || before.isSame(given, 'day');
                }

                ctrl.$setValidity('mobbr-date-before', valid);

                return value;
            };

            // add a parser that will process each time the value is
            // parsed into the model when the user updates it.
            ctrl.$parsers.unshift(validateFunction);

            // add a formatter that will process each time the value 
            // is updated on the DOM element.
            ctrl.$formatters.unshift(validateFunction);

        }
    };
});