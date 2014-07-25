'use strict';

// Common mocks

angular.module('mobbrApi')
    .service('commonTest', function () {
        return {
            ping: function (httpBackend) {
                httpBackend.expectGET('http://api.mobbr.dev/api_v1/user/ping').respond(200, {message: 'ok'});
            },
            response: {message: 'ok', result: {token: '1'}}

        };
    });
