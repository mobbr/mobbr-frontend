'use strict';

angular.module('mobbr.filters').filter('mobbrcurrency', function ($rootScope) {
    return function (amount, currency) {

        var negative,
            localestring;

        if (amount) {

            amount = parseFloat(amount);


            if (amount.toLocaleString && $rootScope.$mobbrStorage.user) {
                localestring = (currency || '') + amount.toLocaleString($rootScope.$mobbrStorage.user.language_iso, {
                    minimumFractionDigits: 4,
                    maximumFractionDigits: 4
                });
            }

            if (!localestring) {
                negative = amount < 0;
                localestring = (negative ? '-' : '') + (currency || '') + ('' + Math.abs(amount).toFixed(4));
            }
        }

        return localestring;
    };
});
