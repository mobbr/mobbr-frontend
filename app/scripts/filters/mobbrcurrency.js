'use strict';

angular.module('mobbr.filters').filter('mobbrcurrency', function () {
    return function(amount, currency) {
        var negative;
        amount = parseFloat(amount);
        negative = amount < 0;
        return (negative ? '-' : '') + currency + ('' + Math.abs(amount).toFixed(4));
    }
});
