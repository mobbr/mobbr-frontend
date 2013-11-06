'use strict';

angular.module('mobbr.services.mbr-api', [

        'ngResource'

    ]).factory('User', function ($resource) {

        return $resource(api_url + '/api/user/:action',{},{
            setPassword: {method: 'POST',params : {action:'update_password'},isArray:false},
            register: {method: 'PUT',params :{action:'register_user_send_login_link'}, isArray:false},
            recover: {method: 'GET',params :{email:'email',username:'username',action:'send_login_link'},isArray:false},
            login: {method: 'PUT',params : {action:'password_login'},isArray:false},
            get: {method: 'GET',params :{action:'logged_in_user'},isArray:false},
            save: {method: 'POST',params :{action:'update_user'}},
            linkLogin: {method: 'PUT',params :{action:'link_login'}},
            logout: {method: 'DELETE',params :{action:'logout'}},
            updateEmail: {method: 'POST',params :{action:'update_email'}},
            confirmEmail: {method: 'POST',params :{action:'confirm_email'}},
            updatePassword: {method: 'POST',params :{action:'update_password'}}
        });

    }).factory('Dashboard', function ($resource) {

        return $resource(api_url + '/api/dashboard/:action',{},{
            getPayments: {method: 'GET',params: { action: 'type'},isArray:false},
            savePayment: {method: 'PUT',params: {action: 'finalize_payments'}},
            deletePayment: {method: 'POST',params: {action: 'delete_payments'}},
            withdraw: {method: 'POST',params: {action: 'send_external_payment'}},
            paymentservices: {method: 'GET',params: {action: 'available_payment_services'}},
            getCurrencies: {method: 'GET',params: { action: 'currencies'},isArray:false}
        });

    }).factory('Domain', function ($resource) {

        return $resource(api_url + '/api/domain/:action',{},{
            getPayments: {method: 'GET',params: { action: 'payments'},isArray:false},
            getLocations: {method: 'GET',params: {action: 'locations'},isArray:false},
            getPersons: {method: 'GET',params: {action: 'persons'},isArray:false},
            isDomainOwner : {method: 'GET',params: {domain:'domain',action: 'is_domain_owner'},isArray:false},
            balances : {method: 'GET',params: {domain:'domain',action: 'balances'},isArray:false},
            info : {method: 'GET',params: {domain:'domain',action: 'domain_info'},isArray:false}
        });

    }).factory('Claim', function ($resource) {

        return $resource(api_url + '/api/claim/:action',{},{
            paymentDescription: {method: 'GET',params: {action: 'payment_script'},isArray:false},
            checkUrl: {method: 'GET',params: { action: 'check_url'},isArray:false},
            unclaimedPayments: {method: 'GET',params: {action: 'unclaimed_payments'},isArray:false},
            claim: {method: 'POST',params: {action: 'claim_url'}}
        });

    }).factory('CreateButton', function ($resource) {

        return $resource(api_url + '/api/script/:action',{},{
            checkUrl: { method: 'GET',params: { url:'url', action: 'retrieve_script' }},
            storeJson: { method: 'PUT',params: { action: 'store_script'}},
            validateJson: { method: 'GET',params: {json:'json', action: 'validate_script' }}
        });

    }).factory('Balances', function ($resource) {

        return $resource(api_url + '/api/dashboard/:action',{},{
            balance: {method: 'GET',params: { action: 'balance_totals' }, isArray:false },
            payments: {method: 'GET',params: { action: 'external_payments' }, isArray:false }
        });

    }).factory('ExchangeRates', function ($resource) {

        return $resource(api_url + '/api/util/:action',{},{
            exchangerates: { method: 'GET',params: { action: 'forex_rates' }, isArray:false }
        });

    }).factory('PaymentReciept', function ($resource) {

        return $resource(api_url + '/api/payment/:action', {}, {
            getPaymentReciept: {method: 'GET', params: { id: 'id', action: 'full_payment_data'}, isArray: false}
        });

    }).factory('Url', function ($resource) {

        return $resource(api_url + '/api/url/:action',{},{
            getLocations: {method: 'GET',params: {action: 'locations'},isArray:false},
            fullData: {method: 'GET',params: {action: 'full_url_data'},isArray:false},
            balances: {method: 'GET',params: {url:'url',action: 'balances'},isArray:false},
            personPayments: {method: 'GET',params: {url:'url',action: 'person_payments'},isArray:false}
        });

    }).factory('Util', function ($resource) {

        return $resource(api_url + '/api/util/:action',{},{
             currencies: {method: 'GET',params: { action: 'currencies'},isArray:false},
             languages: {method: 'GET',params: { action: 'languages'},isArray:false},
             timezones: {method: 'GET',params: { action: 'timezones'},isArray:false}
        });

    }).factory('Api', function ($resource) {

        return $resource(api_url + '/api/api/:action',{},{
            list: {method: 'GET',params: { action: 'list'},isArray:false}
        });

    }).factory('PaymentNetwork', function ($resource) {

        return $resource(api_url + '/api/payment_network/:action', {}, {
            networks: {method: 'GET',params: { action: 'networks'}},
            accountAddresses: {method: 'GET', params: { action: 'account_addresses'}},
            newAccountAddress: {method: 'PUT', params: { action: 'new_account_address'}},
            supportedCurrencies: {method: 'GET', params: { action: 'supported_currencies'}},
            sendPayment: {method: 'POST', params: { action: 'send_payment'}}
        });

    }).factory('Gateway', function ($resource) {

        return $resource(api_url + '/api/gateway/:action', {}, {
            getPayment: {method: 'GET', params : { action: 'get_payment' }},
            registerPayment: {method: 'PUT', params : { action: 'register_payment' }},
            performPayment: {method: 'PUT', params : { action: 'perform_payment' }},
            analyzePayment: {method: 'POST', params : { action: 'analyze_payment' }}
        });

    }
);

