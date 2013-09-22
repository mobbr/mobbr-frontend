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
            idletime += interval;
            $localStorage.idletime = idletime;
            if ($localStorage.idletime > timeout) {
                $rootScope.$emit('idleTimeout:timeout');
                $localStorage.idletime = 0;
            }
            if (running === true) {
                timer = $timeout(activityInterval, interval);
            }
        }

        function start() {
            resetIdleTime();
            running = true;
            activityInterval();
        }

        function stop() {
            running = false;
            $timeout.cancel(timer);
        }

        $rootScope.$on('userSession:login', start);
        $rootScope.$on('userSession:logout', stop);

        return {
            start: start,
            stop: stop,
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
