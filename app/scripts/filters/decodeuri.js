'use strict';

angular.module('mobbr.filters').filter('decodeuri', function ($window) {
    return function (input) {
        return input && $window.decodeURIComponent((input + '').replace(/\+/g, '%20')) || null;
    };
});