describe('mobbr.controllers: UpdatesController', function () {
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
        mobbrSession.setUser({email: 'jan@work.com',id:['http://github.com/test']});


    }));

    function createController() {

        scope.oAuthProviders = common.oAuthProviders;


        contr('UpdatesController', {
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

        scope.$apply();

        expect(scope.parsedIds).not.toBe(undefined);
        expect(scope.parsedIds.length).toBe(1);
        expect(scope.parsedIds[0].host).toBe('github.com');
    });


});
