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
        iMobbrMsg,
        q,
        oAuthProvidersDeferred;

//    var UPDATE_USER_ENDPOINT = 'https://test-api.mobbr.com/api_v1/user/update_user';


    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $httpBackend, mobbrSession, commonTest, mobbrMsg,$q) {
        contr = $controller;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        common = commonTest;
        iMobbrMsg = mobbrMsg;
        q = $q

        httpBackend = $httpBackend;

        spyOn(mobbrMsg, 'add');

        // dummy login
        mobbrSession.setUser({email: 'jan@work.com', id: ['http://github.com/test']});


    }));

    function expectRefreshNotification() {
        httpBackend.expectGET(common.baseUrl + 'notifications').respond(200, {result: [
            {},
            {},
            {}
        ]});
    }

    function createController(oAuthProvidersAsPromise) {

        if (oAuthProvidersAsPromise === true) {
            oAuthProvidersDeferred = q.defer();
            oAuthProvidersDeferred.promise.then(function(){
                scope.oAuthProviders = common.oAuthProviders;
            });

            scope.oAuthProviders = oAuthProvidersDeferred.promise;
        } else {
            scope.oAuthProviders = common.oAuthProviders;
        }

        expectRefreshNotification();
        httpBackend.expectGET(common.baseUrl + 'balances').respond(200, {result: {total_currency_iso: 'EUR', total_amount: 12.32}});


        contr('UpdatesController', {
            $scope: scope,
            $rootScope: rootScope
        });

        common.ping(httpBackend);

    }

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should init the page and retrieve everything', function () {
        createController();
        httpBackend.flush();

        expect(scope.parsedIds).not.toBe(undefined);
        expect(scope.parsedIds.length).toBe(1);
        expect(scope.parsedIds[0].host).toBe('github.com');
        expect(scope.dashboard.total_currency_iso).toBe('EUR');
        expect(scope.dashboard.total_amount).toBe(12.32);
        expect(scope.notifications.length).toBe(3);
    });

    it('should delete all notifications', function () {
        createController();
        httpBackend.flush();
        expect(scope.notifications.length).toBe(3);

        httpBackend.expectDELETE(common.baseUrl + 'notifications').respond(200, {});
        scope.deleteAll();

        httpBackend.expectGET(common.baseUrl + 'notifications').respond(200, {result: []});

        httpBackend.flush();

        expect(scope.notifications.length).toBe(0);

    })

    it('should wait for the oAuthProviders to finish before parsing the ids',function (){
        createController(true);
        httpBackend.flush();
        expect(scope.parsedIds).toBe(undefined);

        oAuthProvidersDeferred.resolve();
        scope.$apply();
        expect(scope.parsedIds.length).toBe(1);
    });


});
