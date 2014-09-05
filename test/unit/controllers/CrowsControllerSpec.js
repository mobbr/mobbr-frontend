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
        state;

//    var UPDATE_USER_ENDPOINT = 'https://test-api.mobbr.com/api_v1/user/update_user';


    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $httpBackend, mobbrSession, commonTest, mobbrMsg, $localStorage) {
        contr = $controller;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        common = commonTest;
        httpBackend = $httpBackend;

        state = {};

        $localStorage.token = undefined;
        // dummy login
        mobbrSession.setUser({email: 'jan@work.com', id: ['http://github.com/test']});

    }));

    function createController() {
        contr('CrowdsController', {
            $scope: scope,
            $state: state
        });
    }

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('Not retrieve anything when no url is given', function () {
        createController();

        expect(scope.url).toBe(undefined);
    });

    it('should retrieve tags and people when a url is known', function(){

    });



});