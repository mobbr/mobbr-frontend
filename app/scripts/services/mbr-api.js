'use strict';

angular.module('mobbr.services.mbr-api', [
        'ngResource'
    ]).factory('User', function ($resource, apiUrl) {

        return $resource(apiUrl + '/api/user/:action',{},{
            setPassword: {method: 'POST',params : {action:'update_password'},isArray:false},
            register: {method: 'PUT',params :{action:'register_user_send_login_link'}, isArray:false},
            recover: {method: 'GET',params :{email:'email',username:'username',action:'send_login_link'},isArray:false},
            login: {method: 'PUT',params : {action:'password_login'},isArray:false},
            get: {method: 'GET',params :{action:'ping'},isArray:false},
            save: {method: 'POST',params :{action:'update_user'}},
            linkLogin: {method: 'PUT',params :{action:'link_login'}},
            logout: {method: 'DELETE',params :{action:'logout'}},
            updateEmail: {method: 'POST',params :{action:'update_email'}},
            confirmEmail: {method: 'POST',params :{action:'confirm_email'}},
            updatePassword: {method: 'POST',params :{action:'update_password'}},
            uploadID: {method: 'PUT',params :{action:'upload_identity_proof'}}
        });

    }).factory('Dashboard', function ($resource, apiUrl) {

        return $resource(apiUrl + '/api/dashboard/:action',{},{
            getPayments: {method: 'GET',params: { action: 'type'},isArray:false},
            savePayment: {method: 'PUT',params: {action: 'finalize_payments'}},
            deletePayment: {method: 'POST',params: {action: 'delete_payments'}},
            revokePledge: {method: 'POST',params: {action: 'delete_pledges'}},
            withdraw: {method: 'POST',params: {action: 'send_external_payment'}},
            getCurrencies: {method: 'GET',params: { action: 'currencies'},isArray:false},
            getExternalPaymentReceipt: {method: 'GET', params: { id: 'id', action: 'external_payment'}, isArray: false}
        });

    }).factory('Domain', function ($resource, apiUrl) {

        return $resource(apiUrl + '/api/domain/:action',{},{
            getPayments: {method: 'GET',params: { action: 'payments'},isArray:false},
            getLocations: {method: 'GET',params: {action: 'locations'},isArray:false},
            getPersons: {method: 'GET',params: {action: 'persons'},isArray:false},
            isDomainOwner : {method: 'GET',params: {domain:'domain',action: 'is_domain_owner'},isArray:false},
            balances : {method: 'GET',params: {domain:'domain',action: 'balances'},isArray:false},
            info : {method: 'GET',params: {domain:'domain',action: 'domain_info'},isArray:false},
            getUnclaimed: {method: 'GET',params: {domain:'domain',action: 'unclaimed_urls'},isArray:false}
        });

    }).factory('Claim', function ($resource, apiUrl) {

        return $resource(apiUrl + '/api/claim/:action',{},{
            paymentDescription: {method: 'GET',params: {action: 'payment_script'},isArray:false},
            checkUrl: {method: 'GET',params: { action: 'check_url'},isArray:false},
            unclaimedPayments: {method: 'GET',params: {action: 'unclaimed_payments'},isArray:false},
            claim: {method: 'POST',params: {action: 'claim_url'}}
        });

    }).factory('CreateButton', function ($resource, apiUrl) {

        return $resource(apiUrl + '/api/script/:action',{},{
            checkUrl: { method: 'GET',params: { url:'url', action: 'retrieve_script' }},
            storeJson: { method: 'PUT',params: { action: 'store_script'}},
            validateJson: { method: 'GET',params: {json:'json', action: 'validate_script' }}
        });

    }).factory('Balances', function ($resource, apiUrl) {

        return $resource(apiUrl + '/api/dashboard/:action',{},{
            balance: {method: 'GET',params: { action: 'balance_totals' }, isArray:false },
            payments: {method: 'GET',params: { action: 'external_payments' }, isArray:false }
        });

    }).factory('ExchangeRates', function ($resource, apiUrl) {

        return $resource(apiUrl + '/api/util/:action',{},{
            exchangerates: { method: 'GET',params: { action: 'forex_rates' }, isArray:false }
        });

    }).factory('PaymentReceipt', function ($resource, apiUrl) {

        return $resource(apiUrl + '/api/payment/:action', {}, {
            getPaymentReceipt: {method: 'GET', params: { id: 'id', action: 'payment'}, isArray: false}
        });

    }).factory('Url', function ($resource, apiUrl) {

        return $resource(apiUrl + '/api/url/:action',{},{
            getLocations: {method: 'GET',params: {action: 'locations'},isArray:false},
            balances: {method: 'GET',params: {url:'url',action: 'balances'},isArray:false},
            personPayments: {method: 'GET',params: {url:'url',action: 'person_payments'},isArray:false},
            persons: {method: 'GET',params: {url:'url',action: 'persons'},isArray:false}
        });

    }).factory('Util', function ($resource, apiUrl) {

        return $resource(apiUrl + '/api/util/:action',{},{
             currencies: {method: 'GET',params: { action: 'currencies'},isArray:false},
             languages: {method: 'GET',params: { action: 'languages'},isArray:false},
             timezones: {method: 'GET',params: { action: 'timezones'},isArray:false},
             countries: {method: 'GET',params: { action: 'countries'},isArray:false}
        });

    }).factory('Api', function ($resource, apiUrl) {

        return $resource(apiUrl + '/api/api/:action',{},{
            list: {method: 'GET',params: { action: 'list'},isArray:false}
        });

    }).factory('PaymentNetwork', function ($resource, apiUrl) {

        return $resource(apiUrl + '/api/payment_network/:action', {}, {
            networks: {method: 'GET',params: { action: 'networks'}},
            newAccountAddress: {method: 'PUT', params: { action: 'new_account_address'}},
            supportedCurrencies: {method: 'GET', params: { action: 'supported_currencies'}},
            sendPayment: {method: 'POST', params: { action: 'send_payment'}},
            prepareDeposit: {method: 'GET', params: { action: 'prepare_deposit'}},
            confirmDeposit: {method: 'PUT', params: { action: 'confirm_deposit'}}
        });

    }).factory('Gateway', function ($resource, apiUrl) {

        return $resource(apiUrl + '/api/gateway/:action', {}, {
            getPayment: {method: 'GET', params : { action: 'get_payment' }},
            registerPayment: {method: 'PUT', params : { action: 'register_payment' }},
            performPayment: {method: 'PUT', params : { action: 'perform_payment' }},
            analyzePayment: {method: 'POST', params : { action: 'analyze_payment' }},
            fullData: {method: 'GET',params: {action: 'full_url_data' },isArray:false}
        });

    }
);

