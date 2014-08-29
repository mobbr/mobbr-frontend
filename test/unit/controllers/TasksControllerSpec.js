describe('mobbr.controllers: TasksController', function () {
    'use strict';

    // loading ngmock
    beforeEach(module('ngMockE2E'));
    // load the controller's module
    beforeEach(module('mobbr.controllers'));

    var contr,
        scope,
        state,
        rootScope,
        httpBackend,
        window,
        common;


    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $httpBackend, mobbrSession, commonTest, $localStorage, $window) {
        contr = $controller;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        common = commonTest;
        window = $window;

        httpBackend = $httpBackend;

        state = {};

        $localStorage.token = undefined;

        // dummy login
        mobbrSession.setUser({email: 'jan@work.com'});


    }));

    function createController() {

        contr('TasksController', {
            $scope: scope,
            $rootScope: rootScope,
            $state: state
        });

    }

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    function createStatesGo(includes) {
        state.includes = function () {
            return includes;
        };
        state.go = function () {
        };
    }

    it('should do nothing when initializing', function () {
        createController();
    });

    it('should encode a taks', function () {
        createController();
        expect(scope.encodeTask('www.mobbr.com')).toBe('d3d3Lm1vYmJyLmNvbQ==');
    });

    it('should got to the specific task url when already on the task url', function () {
        createController();
        state.current = {name: 'testje'};
        createStatesGo(true);
        spyOn(state, 'go');

        scope.setTask('www.mobbr.com');
        expect(state.go).toHaveBeenCalledWith('testje', { task: 'd3d3Lm1vYmJyLmNvbQ==' });
    });

    it('should got to the specific task url when not already on the task url', function () {
        createController();
        createStatesGo(false);
        spyOn(state, 'go');

        scope.setTask('www.mobbr.com');
        expect(state.go).toHaveBeenCalledWith('tasks.view.task', { task: 'd3d3Lm1vYmJyLmNvbQ==' });
    });


    it('should query the task and reset', function () {
        createController();
        createStatesGo(false);
        var task = scope.queryTask(window.btoa('http://github.com/mobbrtest/2'));
        httpBackend.expectGET('https://test-api.mobbr.com/api_v1/uris/info?url=http:%2F%2Fgithub.com%2Fmobbrtest%2F2').respond(200,{"result":{"script":{"description":"mobbrtest has 1 repository available. Follow their code on GitHub.","image":"https:\/\/images.weserv.nl?url=ssl:avatars1.githubusercontent.com%2Fu%2F8267494%3Fv%3D2%26s%3D400&h=150&w=150&t=square&trim=20","title":"Github user 'mobbrtest'","url":"http:\/\/github.com\/mobbrtest","type":"donate","language":"EN","participants":[{"id":"mailto:octocat@github.com","role":"Platform-owner","share":"10%"},{"id":"https:\/\/github.com\/mobbrtest","role":"","share":1}],"message":"Donations will be sent directly to this user.",".script-type":["api"]},"statistics":{"lastpaiddatetime":"2014-08-27 14:59:10","firstpaiddatetime":"2014-08-22 17:09:45","num_recipients":"4","num_senders":"1","num_payments":"49","num_currencies":"1","currencies":["EUR"],"recipient_num_nationalities":"1","nationalities":["NL"],"recipient_age_average":"33.0000","recipient_age_standard_deviation":"0.0000","recipient_share_average":"63.265306122449","recipient_share_standard_deviation":"40.777532584523","recipient_amount_average":"4.857142857142857","recipient_amount_standard_deviation":"5.899705976762308","sender_amount_average":"6.36734693877551","sender_amount_standard_deviation":"5.964842155569414","amount_currency":"EUR","amount_total":"312","amount_average":"6.36734693877551","amount_standard_deviation":"5.964842155569414","is_pledge":"1","has_unclaimed_shares":"1","num_partipants":"2"}},"message":null});
        expect(task.$resolved).toBe(false);
        httpBackend.flush();
        expect(task.$resolved).toBe(true);

        expect(scope.url).toBe('http://github.com/mobbrtest');
        expect(scope.query).toBe('http://github.com/mobbrtest');
        expect(scope.has_failed).toBeFalsy();
        expect(scope.has_script).toBeTruthy();
        expect(scope.has_payments).toBeTruthy();
        expect(scope.has_participants).toBeTruthy();
        expect(scope.task).toBe(task);

        scope.resetTask();

        expect(scope.task).toBe(undefined);
        expect(scope.url).toBe(undefined);
        expect(scope.has_failed).toBeFalsy();
        expect(scope.has_script).toBeFalsy();
        expect(scope.has_payments).toBeFalsy();
        expect(scope.has_participants).toBeFalsy();

    });

    it('should handle retrieve failure', function(){
        createController();
        createStatesGo(false);
        scope.queryTask(window.btoa('http://github.com/mobbrtest/2'));
        httpBackend.expectGET('https://test-api.mobbr.com/api_v1/uris/info?url=http:%2F%2Fgithub.com%2Fmobbrtest%2F2').respond(500);
        httpBackend.flush();

        expect(scope.has_failed).toBeTruthy();
        expect(scope.has_script).toBeFalsy();
        expect(scope.has_payments).toBeFalsy();
        expect(scope.has_participants).toBeFalsy();
    });

});
