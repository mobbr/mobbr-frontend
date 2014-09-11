'use strict';

angular.module('mobbr.filters').filter('mobbrcurrency', function ($rootScope, $sce) {

    var separator = Number('1.2').toLocaleString($rootScope.$mobbrStorage.user && $rootScope.$mobbrStorage.user.language_iso || 'EUR').substr(1,1);

    return function (amount, currency, is_html, decorate) {

        var negative,
            localestring;

        is_html = is_html || false;
        decorate = decorate || false;

        if (amount) {

            negative = amount < 0;
            amount = parseFloat(amount);

            if (amount.toLocaleString && $rootScope.$mobbrStorage.user) {
                localestring = (currency || '') + amount.toLocaleString($rootScope.$mobbrStorage.user.language_iso, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            }

            if (!localestring) {
                localestring = (negative ? '-' : '') + (currency || '') + ('' + Math.abs(amount).toFixed(4));
            }

            if (is_html) {

                var localeparts = localestring.replace(currency, '').split(separator);

                localestring = '<span class="nice-amount '
                    + (decorate && (negative ? 'text-warning' : 'text-success') || '') + '">'
                    + (currency && ('<span class="iso">' + currency +  '</span>') || '')
                    + '<span class="sig">' + localeparts[0] + separator + '</span><span class="frac">' + localeparts[1] + '</span></span>';
                localestring = $sce.trustAsHtml(localestring);
            }
        }

        return localestring;
    };
});
