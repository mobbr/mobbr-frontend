describe('mobbr.controllers: BoxController', function () {

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

    var uriInfoResult = {
        'result': {
            'script': {
                'url': 'http:\/\/zaplog.nl\/zaplog\/article\/rechter_bp_schuldig_aan_grove_nalatigheid_bij_olieramp_2010',
                'title': 'Rechter: BP schuldig aan grove nalatigheid bij olieramp 2010  #zaplog',
                'keywords': ['bp', 'deepwater horizon', 'golf van mexico', 'halliburton', 'milieuramp', 'olieramp', 'vervuiling', 'voedsel', 'water'],
                'language': 'NL',
                'image': 'https:\/\/images.weserv.nl?url=zaplog.nl%2Fimages%2Fsystem%2Fzaplogo.gif&h=150&w=150&t=square&trim=20',
                'description': 'ZapLog - Nederlands beste nieuwssite, Dutch Bloggie winnaar 2008',
                'participants': [
                    {'id': 'http:\/\/zaplog.nl\/zaplog\/person\/patman', 'role': 'Owner', 'share': '1'},
                    {'id': 'http:\/\/zaplog.nl\/zaplog\/person\/appie', 'role': 'Zaplog article author', 'share': '3'}
                ],
                'type': 'donate',
                'message': 'Consider making a donation to this item.',
                '.script-type': ['metadata', 'domain']
            },
            'statistics': []
        },
        'message': null
    };

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $httpBackend, mobbrSession, commonTest, mobbrMsg, $localStorage, $injector, $state, $filter) {
        controller = undefined;
        contr = $controller;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        common = commonTest;
        httpBackend = $httpBackend;
        state = $state;
        spyOn(scope, '$broadcast');

        $localStorage.token = undefined;
        // dummy login
        mobbrSession.setUser({ email: 'jan@work.com', id: [ 'http://github.com/test' ], username: 'Handijk', token: 'testtoken' });
        httpBackend.expectGET('https://test-api.mobbr.com/api_v1/user/ping').respond(200, {});
        httpBackend.flush();

    }));

    function createController(username) {

        contr('BoxController', {
            $scope: scope
         });
    }

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should assign variables to the scope on emitted events', function () {

        createController();

        scope.$emit('set-query', 'Handijk');
        expect(scope.query).toBe('Handijk');
        scope.$emit('set-active-query', 'Handijk');
        expect(scope.activeQuery).toBe('Handijk');
        scope.$emit('set-task', uriInfoResult);
        expect(scope.taskType).toBe(uriInfoResult.result.script.type || null);
        expect(scope.taskMessage).toBe(uriInfoResult.result.script.message || null);
        expect(scope.taskAddresses).toBe(uriInfoResult.result.addresses);
    });

    it('should broadcast an language update event on language update', function () {

        createController();

        scope.filter_language = 'EN';
        scope.$digest();
        scope.filter_language = 'NL';
        scope.$digest();

        expect(scope.$broadcast).toHaveBeenCalledWith('language-update', 'NL');
    });
});
