'use strict';

/**
 * @ngdoc directive
 * @name mobbr.directives.form:mobbr-user-friendly-date
 * @restrict E
 *
 * @description
 * this directive corrects date input that any humun understands
 * so it will be understood by a strict pattern, while helping the user to enter the correct pattern
 *
 * @example
 <example module="mobbr.directives">
 <file name="index.html">
 <div ng-controller="exampleCtrl">
    <label for="testField">Datum veld</label>
    <input id="testField" type="text" placeholder="Voer een datum met een onvolledig formaat en tab eruit om de change af te laten gaan" ng-model="testField" style="display:block; width:100%;">
 </div>
 </file>
 <file name="scripts.js">
 var exampleApp = angular.module("exampleApp", ['mobbr.directives']);

 exampleApp.controller('exampleCtrl', function($scope) {


 });
 </file>
 </example>
 *
 *
 *
 */
angular.module('mobbr.directives').directive('mobbrUserFriendlyDate', function () {
    return {
        restrict: 'A',
        require: 'ngModel',

        link: function (scope, elem) {

            elem.bind('change', function () {

                var value = elem.val();

                var pattern = /^[0-9]{1,2}-[0-9]{1,2}-(?:\d{4}|\d{2})$/;
                var datum;
                if (value.match(pattern)) {
                    datum = moment(value, ['M-D-YY', 'M-DD-YYYY', 'M-DDDD-gg', 'MM-DD-gg', 'MM-DD-YYYY', 'MM-D-YYYY', 'M-D-YYYY']);
                }

                if (datum !== undefined && datum.isValid()) {
                    elem.val(datum.format('MM-DD-YYYY'));
                }
            });


        }
    };
});