'use strict';

angular.module('mobbr.services.timeout', [

        'ngStorage'

    ]).factory('idleTimeout', function ($rootScope, $timeout, $localStorage) {

        var timer,
            timeout = 1000 * 15,
            interval = 1000,
            idletime = 0,
            running = false;

        function resetIdleTime(event) {
            $localStorage.idletime = 0;
        }

        function activityInterval() {
            if ($localStorage.idletime < idletime) idletime = 0;
            console.log('timeout', $localStorage.idletime);
            idletime += interval;
            $localStorage.idletime = idletime;
            if ($localStorage.idletime > timeout) {
                $rootScope.$emit('idleTimeout');
                $localStorage.idletime = 0;
            }
            if (running === true) {
                timer = $timeout(activityInterval, interval);
            }
        }

        return {
            start: function () {
                resetIdleTime();
                running = true;
                activityInterval();
            },
            stop: function () {
                running = false;
                $timeout.cancel(timer);
            },
            reset: resetIdleTime
        };

    }).directive('idleTimeout', function (idleTimeout) {

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('mousemove keypress mousewheel wheel DOMMouseScroll', idleTimeout.reset);
            }
        };
    }
);;
