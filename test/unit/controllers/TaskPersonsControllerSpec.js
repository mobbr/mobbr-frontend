describe('mobbr.controllers: TaskPersonsController', function () {

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

    var personsResult = {"result":[{"username":"<anonymised>","amount":"-12.00","role":["Payer"],"share_average":"100.000000000000","share_std":"0.000000000000","gravatar":"e6032c3bbb3ece98d2782862594b08c2","datetime":"2014-11-28 11:28:40","registerdatetime":"2013-09-24 02:19:05"},{"username":"<anonymised>","amount":"6.00","role":["Concept, design, REST_API programming"],"share_average":"50.000000000000","share_std":"0.000000000000","gravatar":"e6032c3bbb3ece98d2782862594b08c2","datetime":"2014-11-28 11:28:40","registerdatetime":"2013-09-24 02:19:05"},{"username":"Alexander","amount":"0.90","role":["Prototyping"],"share_average":"7.500000000000","share_std":"0.000000000000","gravatar":"579f87c69ade91730da9100634b09dbf","datetime":"2014-11-28 11:28:40","registerdatetime":"2013-09-24 02:19:05"},{"username":"Andre","amount":"1.20","role":["AngularJS front-end programming"],"share_average":"10.000000000000","share_std":"0.000000000000","gravatar":"3abbb654321f4a8c7dd6efa2c57fd866","datetime":"2014-11-28 11:28:40","registerdatetime":"2013-09-24 02:19:05"},{"username":"Handijk","amount":"3.00","role":["AngularJS front-end programming"],"share_average":"25.000000000000","share_std":"0.000000000000","gravatar":"3e5b6279e7c840161e53e762add9cfb9","datetime":"2014-11-28 11:28:40","registerdatetime":"2013-09-24 02:19:05"},{"username":"Robbert","amount":"0.90","role":["Server-infrastructure and facilities"],"share_average":"7.500000000000","share_std":"0.000000000000","gravatar":"eb540b3d67f94442de07b0c63e1ed6a1","datetime":"2014-11-28 11:28:40","registerdatetime":"2013-09-24 02:19:05"}],"message":null};
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

        contr('TaskPersonsController', {
            $scope: scope,
            persons: personsResult
        });
    }

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should assign the fetched persons to the scope', function () {
        createController();
        expect(scope.persons).toBe(personsResult);
    });
});
