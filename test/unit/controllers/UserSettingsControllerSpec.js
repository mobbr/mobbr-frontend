describe('mobbr.controllers: UserSettingsController', function () {
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

    var UPDATE_USER_ENDPOINT = 'https://test-api.mobbr.com/api_v1/user/update_user';


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
        mobbrSession.setUser({email: 'jan@work.com'});


    }));

    function createController() {

        httpBackend.expectGET(common.baseUrl + 'api/oauth_providers').respond({result: []});

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
        httpBackend.expectPOST(common.baseUrl + 'user/upload_identity_proof').respond(200, common.response);
        common.ping(httpBackend);

        var files = [
            {name: 'test.pdf', size: 1024, type: 'pdf'},
            {name: 'test.txt', size: 2048 * 1024 + 1, type: 'txt'}
        ];
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
        httpBackend.expectPOST(common.baseUrl + 'user/upload_identity_proof').respond(500, common.response);
        common.ping(httpBackend);

        var files = [
            {name: 'test.pdf', size: 1024, type: 'pdf'}
        ];
        scope.uploadIdentityProof(files);
        expect(scope.progress).toBe(undefined);

        httpBackend.flush();

        expect(iMobbrMsg.add).not.toHaveBeenCalledWith({ msg: 'File size cannot exceed 2MB' });
        expect(scope.progress).toBe(0);
        expect(scope.uploading).toBe(false);
    });


    it('should submit settings and set the form prestine', function () {
        createController();
        expectUpdateUser();
        common.ping(httpBackend);

        var form = {$setPristine: function () {
        }};
        spyOn(form, '$setPristine');

        scope.submitSettings(form);

        expect(scope.waitingsettings).not.toBe(undefined);
        expect(scope.waitingsettings.$resolved).toBe(false);

        httpBackend.flush();
        expect(form.$setPristine).toHaveBeenCalled();
        expect(scope.waitingsettings.$resolved).toBe(true);
    });

    it('should submit new email adres', function () {
        createController();
        httpBackend.expectPOST(common.baseUrl + 'user/update_email').respond(200, common.response);
        var form = {email: {$modelValue: 'jan@work.nl'}, $setPristine: function () {
        }};
        spyOn(form, '$setPristine');

        scope.submitEmail(form);

        expect(scope.waitingemail.$resolved).toBe(false);
        httpBackend.flush();

        expect(form.$setPristine).toHaveBeenCalled();
        expect(scope.waitingemail.$resolved).toBe(true);
    });

    it('should submit password and reset the form', function () {
        createController();
        httpBackend.expectPOST(common.baseUrl + 'user/update_password').respond(200, common.response);

        scope.passwordHolder.new_password = '123';
        var form = {new_password: {$modelValue: '123'}, $setPristine: function () {
        }, $valid: function () {
            return true;
        }};
        spyOn(form, '$setPristine');

        scope.submitPassword(form);

        httpBackend.flush();
        expect(form.$setPristine).toHaveBeenCalled();
        expect(scope.passwordHolder.new_password).toBe(undefined);
        expect(scope.waitingpassword.$resolved).toBe(true);
    });

    it('should submit a removePaymentID request', function () {
        createController();
        httpBackend.expectDELETE(common.baseUrl + 'user/id?id=MQ%3D%3D').respond(common.response);

        scope.removePaymentID('1', 'index');

        expect(scope.waitingRemoveId.index.$resolved).toBe(false);
        httpBackend.flush();
        expect(scope.waitingRemoveId).toBe(undefined);
    });

    function prepareAddPaymentIdForm(idType) {
        scope.formHolder.addPaymentIdForm = {};
        scope.formHolder.addPaymentIdForm.$valid = true;
        scope.formHolder.addPaymentIdForm.$setPristine = function () {
        };
        spyOn(scope.formHolder.addPaymentIdForm, '$setPristine');
        scope.addPaymentIdHolder.idType = idType;
    }

    it('should addPaymentHolder for idType email', function () {
        createController();
        prepareAddPaymentIdForm('EMAIL');
        httpBackend.expectPOST(common.baseUrl + 'user/email_id').respond(200, common.response);

        scope.addExternalId();
        httpBackend.flush();

        expect(scope.waitingAddId.$resolved).toBe(true);
        expect(scope.addPaymentIdHolder).toEqual({});
        expect(scope.formHolder.addPaymentIdForm.$setPristine).toHaveBeenCalled();


    });

    it('should addPaymentHolder for idType oAUTH', function () {
        createController();
        prepareAddPaymentIdForm('OAUTH');
        scope.addPaymentIdHolder.oAuthProvider = {provider: 'bitbucket'};
        httpBackend.whenGET('https://test-api.mobbr.com/api_v1/user/oauth_url?provider=bitbucket&redirect_url=http:%2F%2Flocalhost:8091%2Fcontext.html').respond(200, {message: 'ok'});

        scope.addExternalId();

        httpBackend.flush();
    });

    it('should refuse to addPaymentHolder without idType', function () {
        createController();

        scope.formHolder.addPaymentIdForm = {};
        scope.formHolder.addPaymentIdForm.$valid = true;

        scope.addExternalId();

        httpBackend.flush();
    });

    it('should toggle the datepopup', function () {
        createController();
        httpBackend.flush();

        expect(scope.datePopup.open).toBe(false);
        var event = {preventDefault: function () {
        }, stopPropagation: function () {
        }};
        scope.toggleDatePopup(event);
        expect(scope.datePopup.open).toBe(true);
        scope.toggleDatePopup(event);
        expect(scope.datePopup.open).toBe(false);
    });

    it('should try to get my gravatar as soons as it is availabe in my profile', function () {
        createController();
        httpBackend.flush();

        expect(scope.thumbnailFound).toBe(undefined);

        scope.$mobbrStorage.user.thumbnail = 'http://avatatar.com';
        httpBackend.expectGET(scope.$mobbrStorage.user.thumbnail).respond(200);
        scope.$apply();
        httpBackend.flush();

        expect(scope.thumbnailFound).toBe(true);
    });

    it('should not to show  my gravatar when there is none', function () {
        createController();
        httpBackend.flush();

        expect(scope.thumbnailFound).toBe(undefined);

        scope.$mobbrStorage.user.thumbnail = 'http://avatatar.com';
        httpBackend.expectGET(scope.$mobbrStorage.user.thumbnail).respond(404);
        scope.$apply();
        httpBackend.flush();

        expect(scope.thumbnailFound).toBe(false);
    });

    it('should count the number of field that are filled', function () {
        createController();
        httpBackend.flush();

        expect(scope.countIdentityCompleted()).toBe(0);

        scope.$mobbrStorage.user.firstname = 'test';
        expect(scope.countIdentityCompleted()).toBe(1);

        expect(scope.countProofCompleted()).toBe(0);

        expect(scope.countInvoicingCompleted()).toBe(0);

        expect(scope.countDisplayCompleted()).toBe(0);
    });


});
