describe('mobbr.controllers: TaskPaymentsController', function () {

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

    var paymentsResult = {"result":[{"id":"c40a585f6725179dba7ad2ab9e5dbde3","url":"https:\/\/mobbr.com","datetime":"2014-11-28 11:28:40","amount":"12.00000000","currency_iso":"EUR","is_pledge":"0","receiver":[{"gravatar":"5052ca2ed974fcc42688b7b297a6ab95","username":"<anonymised>"},{"gravatar":"579f87c69ade91730da9100634b09dbf","username":"Alexander"},{"gravatar":"eb540b3d67f94442de07b0c63e1ed6a1","username":"Robbert"},{"gravatar":"3e5b6279e7c840161e53e762add9cfb9","username":"Handijk"},{"gravatar":"3abbb654321f4a8c7dd6efa2c57fd866","username":"Andre"}],"senders":[{"gravatar":"5052ca2ed974fcc42688b7b297a6ab95","username":"<anonymised>"}]}],"message":null};

    var url;
    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $httpBackend, mobbrSession, commonTest, mobbrMsg, $localStorage, $injector, $state, $filter, apiUrl) {
        url = apiUrl;
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
        httpBackend.expectGET(url + '/api_v1/user/ping').respond(200, {});
        httpBackend.flush();

    }));

    function createController() {

        contr('TaskPaymentsController', {
            $scope: scope,
            payments: paymentsResult
        });
    }

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should assign the fetched payments to the scope', function () {
        createController();
        expect(scope.payments).toBe(paymentsResult);
    });
});
