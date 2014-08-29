describe('mobbr.controllers: TaskController', function () {
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
        spyOn(scope,'$broadcast').andCallThrough();

        state.params = {task:'http://github.com/mobbrtest'};


    }));

    function createController() {

        contr('TaskController', {
            $scope: scope,
            $rootScope: rootScope,
            $state: state
        });

    }

    function createStatesGo(includes) {
        state.includes = function () {
            return includes;
        };
        state.go = function () {
        };
    }

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });


    it('should do nothing when initializing', function () {
        createController();

        expect(scope.$broadcast).toHaveBeenCalledWith('tasks-query-task','http://github.com/mobbrtest');
    });

    it('should try to redirect on $routeChangeSuccess', function(){
        createController();
        createStatesGo(true);
        spyOn(state,'go');

        state.current = {name:'tasks.view.task.persons'};

        scope.$broadcast('$stateChangeSuccess');
        scope.$apply();
        expect(state.go).toHaveBeenCalledWith('tasks.view.task');
    });
});