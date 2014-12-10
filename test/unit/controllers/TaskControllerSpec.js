describe('mobbr.controllers: TaskController', function () {

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
        uniqueFilter = $injector.get('filterFilter')('unique');
        spyOn(state, 'go');
        spyOn(scope, '$emit');

        $localStorage.token = undefined;
        // dummy login
        mobbrSession.setUser({ email: 'jan@work.com', id: [ 'http://github.com/test' ], username: 'Handijk', token: 'testtoken' });
        httpBackend.expectGET('https://test-api.mobbr.com/api_v1/user/ping').respond(200, {});
        httpBackend.flush();

    }));

    function createController(withHash) {

        if (withHash) {
            state.params = {
                task: withHash
            };
        } else {
            state.params = {};
        }

        contr('TaskController', {
            $scope: scope,
            $state: state,
            task: withHash ? uriInfoResult : null,
            uniqueFilter: uniqueFilter
        });
    }

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should redirect to the state with the url defined in the script if this was different from the url it is called with', function () {

        createController('aHR0cHM6Ly9tb2Jici5jb20=');

        expect(state.go).toHaveBeenCalledWith('box.task', { task: 'aHR0cDovL3phcGxvZy5ubC96YXBsb2cvYXJ0aWNsZS9yZWNodGVyX2JwX3NjaHVsZGlnX2Fhbl9ncm92ZV9uYWxhdGlnaGVpZF9iaWpfb2xpZXJhbXBfMjAxMA==' });

        expect(scope.$emit).not.toHaveBeenCalled();
    });

    it('should set the scope variables', function () {

        createController('aHR0cDovL3phcGxvZy5ubC96YXBsb2cvYXJ0aWNsZS9yZWNodGVyX2JwX3NjaHVsZGlnX2Fhbl9ncm92ZV9uYWxhdGlnaGVpZF9iaWpfb2xpZXJhbXBfMjAxMA==');

        expect(state.go).not.toHaveBeenCalled();

        expect(scope.domain).toBe('zaplog.nl');
        expect(scope.url).toBe('http://zaplog.nl/zaplog/article/rechter_bp_schuldig_aan_grove_nalatigheid_bij_olieramp_2010');
        expect(scope.task).toBe(uriInfoResult);
        expect(scope.has_failed).toBe(false);
        expect(scope.has_script).toBe(true);
        expect(scope.has_payments).toBe(false);
        expect(scope.has_participants).toBe(false);

        expect(scope.$emit).toHaveBeenCalledWith('set-query', scope.url);
        expect(scope.$emit).toHaveBeenCalledWith('set-active-query', scope.url);
        expect(scope.$emit).toHaveBeenCalledWith('set-task', scope.task);
    });
});
