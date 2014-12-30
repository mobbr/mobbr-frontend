describe('mobbr.controllers: PaymentsController', function () {
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
        iMobbrMsg,
        timeout;

//    var UPDATE_USER_ENDPOINT = url + '/api_v1/user/update_user';


    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $httpBackend, mobbrSession, commonTest, mobbrMsg, $timeout, $localStorage) {
        contr = $controller;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        common = commonTest;
        iMobbrMsg = mobbrMsg;
        timeout = $timeout;
        httpBackend = $httpBackend;

        $localStorage.token = undefined;


        // dummy login
        mobbrSession.setUser({email: 'jan@work.com', id: ['http://github.com/test']});

    }));

    function expectPaymentSearch(searchArgument) {
        if (searchArgument) {
            httpBackend.expectGET(common.baseUrl + 'payments?limit=10&offset=0&search=' + searchArgument).respond(200, {result: []});
        } else {
            httpBackend.expectGET(common.baseUrl + 'payments?limit=10&offset=0').respond(200, {result: [
                {id:'1'},
                {},
                {},
                {}
            ]});
        }
    }

    function expectPledges() {
        httpBackend.expectGET(common.baseUrl + 'payments/pledged').respond(200, {result: [
            {id:"1"},
            {},
            {}
        ]});
    }

    function expectUnclaimed() {
        httpBackend.expectGET(common.baseUrl + 'payments/unclaimed_shares').respond(200, {result: [
            {id: '1'},
            {id: '2'}
        ]});
    }

    function createController() {

        expectPaymentSearch();

        expectPledges();

        expectUnclaimed();


        contr('PaymentsController', {
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

        expect(scope.pledgedTable.data.length).toBe(3);
        expect(scope.unclaimedTable.data.length).toBe(2);
        expect(scope.paymentTable.data.length).toBe(4);
    });

    it('should filter selected pledges', function () {
        createController();
        httpBackend.flush();

        scope.pledgedTable.data[0].selected = true;
        expect(scope.filterSelectedIds(scope.pledgedTable.data).length).toBe(1);
    });

    it('should search for payments with entered argument and clear when entered argument is less than 2 caracters', function () {
        createController();
        httpBackend.flush();

        scope.paymentTable.search = 'test';
        scope.$apply();
        expectPaymentSearch('test');
        timeout.flush();
        httpBackend.flush();
        expect(scope.paymentTable.data.length).toBe(0);

        scope.paymentTable.search = 'te';
        scope.$apply();
        expectPaymentSearch();
        timeout.flush();
        httpBackend.flush();
        expect(scope.paymentTable.data.length).toBe(4);
    });

    it('should revoke selected shares and refresh', function () {
        createController();
        httpBackend.flush();

        scope.unclaimedTable.data[0].selected = true;
        scope.revokeSelectedShares();
        httpBackend.expectDELETE(common.baseUrl + 'payments/unclaimed_shares?ids=1').respond(200, {});
        expectUnclaimed();
        httpBackend.flush();
    });


    it('should unpledge selected pledges and refresh', function () {
        createController();
        httpBackend.flush();

        scope.pledgedTable.data[0].selected = true;
        httpBackend.expectDELETE(common.baseUrl + 'payments/pledged?ids=1').respond(200, {});
        expectPledges();
        scope.removePledes();
        httpBackend.flush();
    });


    it('should download selected shares', function () {
        createController();
        httpBackend.flush();

        scope.unclaimedTable.data[0].selected = true;
        scope.downloadInvoiceSelectedShares();
    });


    it('should download selected pledge', function () {
        createController();
        httpBackend.flush();

        scope.pledgedTable.data[0].selected = true;
        scope.downloadInvoiceSelectedPayments();
    });

});