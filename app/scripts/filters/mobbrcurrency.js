'use strict';

angular.module('mobbr.filters').filter('mobbrcurrency', function ($rootScope, $sce) {

    var separator = Number('1.2').toLocaleString && Number('1.2').toLocaleString($rootScope.getLanguage()).substr(1,1) || '.',
        ua = navigator.userAgent.toLowerCase(),
        safari;

    if (ua.indexOf('safari') != -1) {
        if (ua.indexOf('chrome') > -1) {
            safari = false;
        } else {
            safari = true;
        }
    }

    return function (amount, currency, is_html, decorate) {

        var negative,
            localestring;

        is_html = is_html || false;
        decorate = decorate || false;

        if (amount !== undefined) {

            negative = amount < 0;
            amount = parseFloat(amount);

            if (amount.toLocaleString && !safari) {
                localestring = (currency || '') + amount.toLocaleString($rootScope.getLanguage(), {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            }

            if (!localestring) {
                localestring = (negative ? '-' : '') + (currency || '') + ('' + Math.abs(amount).toFixed(2));
            }

            if (is_html) {

                var number = localestring.replace(currency, ''),
                    localeparts = number.split(separator),
                    frac = localestring.substr(-2, 2).toString();

                localestring = '<span class="nice-amount '
                    + (decorate && (negative ? 'text-warning' : 'text-success') || '') + '">'
                    + (currency && ('<span class="iso">' + currency +  '</span>') || '')
                    + '<span class="sig">' + localeparts[0] + separator + '</span><span class="frac">' + frac + '</span></span>';
                localestring = $sce.trustAsHtml(localestring);
            }
        }

        return localestring;
    };
});
