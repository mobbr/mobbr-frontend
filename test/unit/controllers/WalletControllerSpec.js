describe('mobbr.controllers: WalletController', function () {
    'use strict';

    // loading ngmock
    beforeEach(module('ngMockE2E'));
    // load the controller's module
    beforeEach(module('mobbr.controllers'));

    var contr,
        scope,
        rootScope,
        httpBackend,
        common,
        iMobbrMsg;

//    var UPDATE_USER_ENDPOINT = 'https://test-api.mobbr.com/api_v1/user/update_user';


    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $httpBackend, mobbrSession, commonTest, mobbrMsg) {
        contr = $controller;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        common = commonTest;
        iMobbrMsg = mobbrMsg;


        httpBackend = $httpBackend;

        spyOn(mobbrMsg, 'add');

        // dummy login
        mobbrSession.setUser({email: 'jan@work.com', id: ['http://github.com/test']});


    }));


    function createController() {

        httpBackend.expectGET(common.baseUrl + 'xpayments').respond(200, {result: [
            {},
            {}
        ]});
        httpBackend.expectGET(common.baseUrl + 'xpayments/supported_currencies').respond(200, {result: [
            {},
            {},
            {}
        ]});
        httpBackend.expectGET(common.baseUrl + 'balances/user').respond(200, {result: {total_currency_iso: 'EUR', total_amount: 12.32, balances: [
            {},
            {}
        ]}});

        contr('WalletController', {
            $scope: scope,
            $rootScope: rootScope
        });


    }

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should init the page and retrieve everything', function () {
        createController();
        httpBackend.flush();

        expect(scope.walletAddresses.length).toBe(3);
        expect(scope.dashboard.balances.length).toBe(2);
        expect(scope.payments.length).toBe(2);
    });

    it('should add a new bitcoindaddress', function () {
        createController();
        httpBackend.flush();

        expect(scope.walletAddresses.length).toBe(3);


        scope.addBitcoinAddress('BTC');
        httpBackend.expectPUT(common.baseUrl + 'xpayments/new_account_address').respond(200,{});
        // just returning a differnt count to make sure it is updated
        httpBackend.expectGET(common.baseUrl + 'xpayments/supported_currencies').respond(200, {result: [
            {},
            {}
        ]});

        httpBackend.flush();
        expect(scope.walletAddresses.length).toBe(2);

    });
});