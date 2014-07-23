'use strict';

describe('mobbr.controllers: MainController', function () {

    // load the controller's module
    beforeEach(module('mobbr.controllers'));

    var MainCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MainCtrl = $controller('MainController', {
            $scope: scope
        });
    }));

    it('should not do anything yet', function () {

    });
});