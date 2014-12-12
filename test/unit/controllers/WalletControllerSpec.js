describe('mobbr.controllers: WalletController', function () {

    'use strict';

    // loading ngmock
    beforeEach(module('ngMockE2E'));
    // load the controller's module
    beforeEach(module('mobbr.controllers'));
    // load the state router
    beforeEach(module('ui.router'));

    var contr,
        scope,
        rootScope,
        httpBackend,
        common,
        state,
        controller,
        uniqueFilter;

    var balancesResult = {"result":{"balances":[{"updatedatetime":"2014-12-10 11:19:37","amount":"8316.70162122","fee":"0.00000000","spendable":"8316.70162122","currency_iso":"EUR","exchange_rate":"7.438875198364258","converted_amount":"61866.90542228927","currency_description":"Euro"},{"updatedatetime":"2014-12-01 00:00:02","amount":"0.00885863","fee":"0.00000000","spendable":"0.00885863","currency_iso":"BTC","exchange_rate":"2068.17833974021","converted_amount":"18.321226685772814","currency_description":"Bitcoin"}],"total_amount":"61885.226648975","total_currency_iso":"DKK"},"message":null};
    var xPaymentsResult = {"result":[{"id":"e0753dfda38c7e41bcef098da1f41932","prosumer":"Handijk","currency_iso":"EUR","amount":"-2.00000000","costs":"0.00000000","announceddatetime":"2014-07-28 17:02:48","paiddatetime":"2014-07-28 17:02:48","faileddatetime":null,"receive_address":"TRIONL2U:nl19trio0254730329","payment_service":"mangopay","ext_trx_id":"6087322","note":"","confirmation_key":null,"service_message":null,"since_last_login":null},{"id":"e1f07692928d432bf4f561218b2608de","prosumer":"Handijk","currency_iso":"EUR","amount":"99.00000000","costs":"0.00000000","announceddatetime":"2014-07-11 15:51:44","paiddatetime":null,"faileddatetime":"2014-07-11 16:10:02","receive_address":null,"payment_service":"mangopay","ext_trx_id":"5681905","note":"test","confirmation_key":null,"service_message":"Payment not completed due to internal error","since_last_login":null},{"id":"06065d30e1da1029bbefe9f36f770390","prosumer":"Handijk","currency_iso":"EUR","amount":"9.64000000","costs":"0.00000000","announceddatetime":"2014-07-11 13:35:17","paiddatetime":null,"faileddatetime":"2014-07-11 14:00:01","receive_address":null,"payment_service":"mangopay","ext_trx_id":"5677689","note":"test","confirmation_key":null,"service_message":"Payment not completed due to internal error","since_last_login":null},{"id":"8aa7bd35c964ac9fa8230107de7fd739","prosumer":"Handijk","currency_iso":"BTC","amount":"0.00100000","costs":"0.00000000","announceddatetime":"2014-05-28 14:31:11","paiddatetime":"2014-05-28 14:31:11","faileddatetime":null,"receive_address":"17NjVACeFeG7MV9qgaCFK6vwUrdqiiW1uq","payment_service":"bitcoin","ext_trx_id":" d9024fc6b847383510eac81f16f9d5dd69e35a56c9761224ae84e31e253ba992","note":null,"confirmation_key":null,"service_message":null,"since_last_login":null},{"id":"d5f16b33dc2af49cf34c5a0bee4c5960","prosumer":"Handijk","currency_iso":"EUR","amount":"-1.00000000","costs":"0.00000000","announceddatetime":"2014-05-26 09:29:51","paiddatetime":"2014-05-26 09:29:51","faileddatetime":null,"receive_address":"TRIONL2U:nl19trio0254730329","payment_service":"mangopay","ext_trx_id":"4503245","note":"","confirmation_key":null,"service_message":null,"since_last_login":null},{"id":"901a6291f1e368a7dcba1ff668ae02d2","prosumer":"Handijk","currency_iso":"EUR","amount":"0.80000000","costs":"0.00000000","announceddatetime":"2014-05-16 11:39:57","paiddatetime":"2014-05-16 11:40:44","faileddatetime":null,"receive_address":null,"payment_service":"mangopay","ext_trx_id":"4279031","note":"test","confirmation_key":null,"service_message":null,"since_last_login":null},{"id":"6dcd9d7abdd19d8190651b68c291a9c2","prosumer":"Handijk","currency_iso":"EUR","amount":"1227.32000000","costs":"0.00000000","announceddatetime":"2014-05-13 12:39:19","paiddatetime":null,"faileddatetime":"2014-05-13 12:39:19","receive_address":null,"payment_service":"mangopay","ext_trx_id":"4193851","note":"test","confirmation_key":null,"service_message":"Transaction refused by the bank (Amount limit)","since_last_login":null},{"id":"bd613997a1e2f9608b088ff665adf6e6","prosumer":"Handijk","currency_iso":"EUR","amount":"1227.32000000","costs":"0.00000000","announceddatetime":"2014-05-13 12:28:52","paiddatetime":null,"faileddatetime":"2014-05-13 12:28:52","receive_address":null,"payment_service":"mangopay","ext_trx_id":"4193417","note":"test","confirmation_key":null,"service_message":"Transaction refused by the bank (Amount limit)","since_last_login":null},{"id":"8bb6df4db7063795fef215022afe079c","prosumer":"Handijk","currency_iso":"EUR","amount":"1227.32000000","costs":"0.00000000","announceddatetime":"2014-05-13 12:28:21","paiddatetime":null,"faileddatetime":"2014-05-13 12:28:21","receive_address":null,"payment_service":"mangopay","ext_trx_id":"4193401","note":"test","confirmation_key":null,"service_message":"The transaction has been cancelled by the user","since_last_login":null},{"id":"d41251b6056a05adb33cbea15abf9bc5","prosumer":"Handijk","currency_iso":"EUR","amount":"2454.82000000","costs":"0.00000000","announceddatetime":"2014-05-13 11:11:21","paiddatetime":null,"faileddatetime":"2014-05-13 11:11:21","receive_address":null,"payment_service":"mangopay","ext_trx_id":"4190080","note":"","confirmation_key":null,"service_message":"Payment not completed due to internal error","since_last_login":null}],"message":null};
    var xPaymentsMoreResult = {"result":[{"id":"ccf802aac43aadaa4cd55a550b6a476c","prosumer":"Handijk","currency_iso":"EUR","amount":"2454.82000000","costs":"0.00000000","announceddatetime":"2014-05-13 11:05:51","paiddatetime":null,"faileddatetime":"2014-05-13 11:05:51","receive_address":null,"payment_service":"mangopay","ext_trx_id":"4189902","note":"test","confirmation_key":null,"service_message":"Payment not completed due to internal error","since_last_login":null},{"id":"3c8a2a8b4391b5f24db9cad532eacaaf","prosumer":"Handijk","currency_iso":"EUR","amount":"2454.82000000","costs":"0.00000000","announceddatetime":"2014-05-13 11:05:05","paiddatetime":null,"faileddatetime":"2014-05-13 11:05:05","receive_address":null,"payment_service":"mangopay","ext_trx_id":"4189866","note":"test","confirmation_key":null,"service_message":"Payment not completed due to internal error","since_last_login":null},{"id":"d48fd259a6e2bdec305777270dc91a46","prosumer":"Handijk","currency_iso":"EUR","amount":"0.80000000","costs":"0.00000000","announceddatetime":"2014-05-09 14:41:01","paiddatetime":"2014-05-09 14:41:40","faileddatetime":null,"receive_address":null,"payment_service":"mangopay","ext_trx_id":"4106775","note":"test","confirmation_key":null,"service_message":null,"since_last_login":null},{"id":"073ede0b226bc4f159cafba59fe81749","prosumer":"Handijk","currency_iso":"EUR","amount":"0.80000000","costs":"0.00000000","announceddatetime":"2014-05-05 11:51:59","paiddatetime":null,"faileddatetime":"2014-05-05 11:51:59","receive_address":null,"payment_service":"mangopay","ext_trx_id":"3995645","note":"test","confirmation_key":null,"service_message":"The transaction has been cancelled by the user","since_last_login":null},{"id":"8481a2f5420a04b4c5b5c2d161ff357d","prosumer":"Handijk","currency_iso":"EUR","amount":"0.80000000","costs":"0.00000000","announceddatetime":"2014-05-05 11:50:46","paiddatetime":"2014-05-05 11:51:22","faileddatetime":null,"receive_address":null,"payment_service":"mangopay","ext_trx_id":"3995606","note":"test","confirmation_key":null,"service_message":null,"since_last_login":null},{"id":"c762aae7d3b619b2a5db57ef436a1676","prosumer":"Handijk","currency_iso":"EUR","amount":"0.80000000","costs":"0.00000000","announceddatetime":"2014-05-05 11:15:05","paiddatetime":"2014-05-05 11:18:01","faileddatetime":null,"receive_address":null,"payment_service":"mangopay","ext_trx_id":"3994663","note":"test","confirmation_key":null,"service_message":null,"since_last_login":null}],"message":null};
    var emptyResult = {"result":[],"message":null};

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $httpBackend, mobbrSession, commonTest, mobbrMsg, $localStorage, $injector, $state, $filter) {
        controller = undefined;
        contr = $controller;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        common = commonTest;
        httpBackend = $httpBackend;
        state = $state;

        $localStorage.token = undefined;
        // dummy login
        mobbrSession.setUser({ email: 'jan@work.com', id: [ 'http://github.com/test' ], username: 'Handijk', token: 'testtoken' });
        httpBackend.expectGET('https://test-api.mobbr.com/api_v1/user/ping').respond(200, {});
        httpBackend.flush();

    }));

    function createController() {

        contr('WalletController', {
            $scope: scope,
            xpayments: xPaymentsResult,
            balance: balancesResult
        });
    }

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should assign the fetched resources to the scope and set the limiter to 10', function () {

        createController();

        expect(scope.payments).toBe(xPaymentsResult);
        expect(scope.dashboard).toBe(balancesResult);
        expect(scope.limiter).toBe(10);
    });

    it('should fetch another 10 records', function () {

        createController();

        scope.more();
        httpBackend.expectGET('https://test-api.mobbr.com/api_v1/xpayments?limit=10&offset=10').respond(200, xPaymentsMoreResult);
        httpBackend.flush();

        expect(scope.payments.result.length).toBe(16);
        expect(scope.limiter).toBe(20);
    });

    it('should search for records', function () {

        createController();

        scope.more();
        httpBackend.expectGET('https://test-api.mobbr.com/api_v1/xpayments?limit=10&offset=10').respond(200, xPaymentsMoreResult);
        httpBackend.flush();

        scope.filterText = 'test';
        scope.search();
        httpBackend.expectGET('https://test-api.mobbr.com/api_v1/xpayments?limit=10&offset=0&search=test').respond(200, emptyResult);
        httpBackend.flush();

        expect(scope.payments.result.length).toBe(0);
        expect(scope.limiter).toBe(10);
    });
});
