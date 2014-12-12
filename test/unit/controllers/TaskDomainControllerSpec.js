describe('mobbr.controllers: TaskDomainController', function () {

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

    var urlsResult = {"result":[{"url":"https:\/\/mobbr.com","title":"MOBBR Crowdpayment System","description":"Welcome to MOBBR, the world's first crowdpayment system. Start sharing rewards and donations in bitcoin, XRP, social currencies and FIAT currencies.","language_iso":null,"copyright":null,"img_url":"https:\/\/images.weserv.nl?url=ssl:mobbr.com%2Fimg%2Fmobbr-ripple.jpg&h=150&w=150&t=square&trim=20","currency_iso":"EUR","amount_total":"12","lastpaiddatetime":"2014-11-28 11:28:40","firstpaiddatetime":"2014-11-28 11:28:40","num_payments":"1","match_percentage":"0","num_keywords":"0","num_currencies":"1","currencies":["EUR"],"is_pledge":"0","domain":"mobbr.com","favicon":"https:\/\/www.google.com\/s2\/favicons?domain=mobbr.com","link":{"info":"\/api_v1\/uris\/info?url=https%3A%2F%2Fmobbr.com","payments":"\/api_v1\/payments\/uri?url=https%3A%2F%2Fmobbr.com","persons":"\/api_v1\/persons\/uri?url=https%3A%2F%2Fmobbr.com","notification":"\/api_v1\/notifications\/uri?url=https%3A%2F%2Fmobbr.com"}}],"message":null};

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

        contr('TaskDomainController', {
            $scope: scope,
            urls: urlsResult
        });
    }

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should assign the fetched tasks to the scope', function () {
        createController();
        expect(scope.urls).toBe(urlsResult);
    });
});
