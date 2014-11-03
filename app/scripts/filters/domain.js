'use strict';

angular.module('mobbr.filters').filter('domain', function () {
    return function (input) {
        return purl(input).data.attr.host;
    };
});