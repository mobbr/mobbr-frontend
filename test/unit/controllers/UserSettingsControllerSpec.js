'use strict';

describe('mobbr.controllers: UserSettingsController', function () {

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

    var UPDATE_USER_ENDPOINT = 'http://api.mobbr.dev/api_v1/user/update_user';


    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $httpBackend, mobbrSession, commonTest, mobbrMsg) {
        contr = $controller;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        common = commonTest;
        iMobbrMsg = mobbrMsg;

        httpBackend = $httpBackend;

        spyOn(mobbrMsg,'add');

        // dummy login
        mobbrSession.setUser({email: 'jan@work.com'});


    }));

    function createController() {


        contr('UserSettingsController', {
            $scope: scope,
            $rootScope: rootScope
        });


    }

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    function expectUpdateUser() {
        httpBackend.expectPOST(UPDATE_USER_ENDPOINT).respond(200, {message: 'ok', result: {token: '1'}});
    }

    it('should submit settings', function () {
        createController();

        var form = {$setPristine: function () {
        }};
        spyOn(form, '$setPristine');

        expectUpdateUser();
        common.ping(httpBackend);
        scope.submitSettings(form);
        httpBackend.flush();

        expect(form.$setPristine).toHaveBeenCalled();
    });

    it('should upload identityproof, but refuse later than 2mb files', function () {

        createController();

        expectUpdateUser();
        httpBackend.expectPOST('http://api.mobbr.dev/api_v1/user/upload_identity_proof').respond(200,common.response);
        common.ping(httpBackend);

        var files = [{name:'test.pdf',size:1024,type:'pdf'},{name:'test.txt',size:2048 * 1024 +1 ,type:'txt'}];
        scope.uploadIdentityProof(files);
        expect(scope.progress).toBe(undefined);

        httpBackend.flush();

        expect(iMobbrMsg.add).toHaveBeenCalledWith({ msg: 'File size cannot exceed 2MB' });
        expect(scope.progress).toBe(0);
        expect(scope.uploading).toBe(false);
    });

    it('should upload identityproof but it can go wrong', function () {

        createController();

        expectUpdateUser();
        httpBackend.expectPOST('http://api.mobbr.dev/api_v1/user/upload_identity_proof').respond(500,common.response);
        common.ping(httpBackend);

        var files = [{name:'test.pdf',size:1024,type:'pdf'}];
        scope.uploadIdentityProof(files);
        expect(scope.progress).toBe(undefined);

        httpBackend.flush();

        expect(iMobbrMsg.add).not.toHaveBeenCalledWith({ msg: 'File size cannot exceed 2MB' });
        expect(scope.progress).toBe(0);
        expect(scope.uploading).toBe(false);
    });


});
