'use strict';

angular.module('mobbr.services.Gateway', [ 'ngResource' ])
    .factory('Gateway', function($resource) {
        return $resource(api_url + '/api/gateway/:action',{},{
            getPayment: {method: 'GET', params : { action:'get_payment' }},
            registerPayment: {method: 'PUT', params : { action:'register_payment' }}
        });
    }
);
