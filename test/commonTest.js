'use strict';

// Common mocks

angular.module('mobbrApi')
    .service('commonTest', function (mobbrConfig) {
        return {
            baseUrl : mobbrConfig.url,
            ping: function (httpBackend) {
                httpBackend.expectGET(mobbrConfig.url + 'user/ping').respond(200, {message: 'ok'});
            },
            response: {message: 'ok', result: {token: '1'}}


        };
    });
