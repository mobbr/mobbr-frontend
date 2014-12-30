describe('mobbr.controllers: JoinController', function () {

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
        msg;

    var joinResult = {"result":{"username":"Handijk","email":"info@handijk.nl","status":"activated","currency_iso":"DKK","registerdatetime":"2013-09-24 02:19:05","lastlogindatetime":"2014-12-10 12:36:16","lastupdateddatetime":"2014-12-10 13:40:01","kyclightdatetime":null,"kycregulardatetime":null,"updatesdatetime":null,"kyc_level":"regular","language_iso":"EN","timezone":"Europe\/Amsterdam","bitcoin_address":null,"ripple_address":null,"firstname":"Han","lastname":"Dijk","birthday":"1981-06-18","address":"Pathmossingel 98, Enschede","country_of_residence":"NL","occupation":"Programmer","income_range":"2","nationality":"NL","mangopay_identity_proof":"VALIDATED","mangopay_address_proof":"PROOF_REQUIRED","companyname":"Han Dijk","vat_number":"NL171826838B02","vat_rate":"21","bio":null,"invoice_numbering_prefix":"handijk-","invoice_numbering_postfix":null,"id":["https:\/\/github.com\/handijk","https:\/\/gravatar.com\/handijk","https:\/\/mobbr.com\/#\/person\/handijk","https:\/\/www.linkedin.com\/in\/handijk","mailto:info@handijk.nl"],"token":"95905223da0e36be240f08a6268d2660","thumbnail":"https:\/\/secure.gravatar.com\/avatar\/3e5b6279e7c840161e53e762add9cfb9?size=30&d=https:\/\/mobbr.com\/img\/default-gravatar2.png","setting":{"hide_my_profile":"0","hide_my_outgoing_payments":"0","hide_my_incoming_payments":"0","hide_my_items":"0","send_invoice_download_notification":"1","send_task_invitation_notification":"1","hide_my_email_from_donators":"1","hide_my_email_from_public":"1","send_monthly_reports":"1","send_newsletter":"1","send_json_mention_notification":"1","send_payment_received_notification":"1","send_payment_expired_notification":"1"},"msg":[]},"message":{"text":"Your account was logged in","type":"info"}};
    var joinFailed = {"result":null,"message":{"type":"error","text":"Username or email not available"}};
    var url;
    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $httpBackend, mobbrSession, commonTest, mobbrMsg, $localStorage, $injector, $state, $filter, apiUrl) {
        url = apiUrl;
        controller = undefined;
        contr = $controller;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        common = commonTest;
        httpBackend = $httpBackend;
        state = $state;
        window.ga = function () {};
        spyOn(window, 'ga');
        msg = mobbrMsg;
        spyOn(msg, 'add');

        $localStorage.token = undefined;
        // dummy login
        mobbrSession.setUser({ email: 'jan@work.com', id: [ 'http://github.com/test' ], username: 'Handijk', token: 'testtoken' });
        httpBackend.expectGET(url + '/api_v1/user/ping').respond(200, {});
        httpBackend.flush();

    }));

    function createController() {

        contr('JoinController', {
            $scope: scope,
            mobbrMsg: msg
        });
    }

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should register the user', function () {

        var username = 'Henkie',
            email = 'henkie@handijk.nl',
            password = 'test123';

        createController();
        scope.username = username;
        scope.email = email;
        scope.password = password;
        scope.register = { $invalid: false };
        scope.registerUser();
        httpBackend.expectPUT(url + '/api_v1/user/register_user_send_login_link', {
            username: username,
            email: email,
            password: password
        }).respond(200, joinResult);
        httpBackend.flush();
        expect(scope.username).toBe('');
        expect(scope.email).toBe('');
        expect(scope.password).toBe('');
        expect(window.ga).toHaveBeenCalledWith('send', 'event', 'account', 'register', 'username', username);
    });

    it('should warn the user the passwords dont match', function () {

        var username = 'Henkie',
            email = 'henkie@handijk.nl',
            password = 'test123';

        createController();
        scope.username = username;
        scope.email = email;
        scope.password = password;
        scope.register = { $invalid: true };
        scope.registerUser();
        expect(msg.add).toHaveBeenCalledWith({ msg: 'Make sure the passwords match', type: 'danger' });
    });

    it('should not register a user', function () {

        var username = 'Handijk',
            email = 'info@handijk.nl',
            password = 'test123';

        createController();
        scope.username = username;
        scope.email = email;
        scope.password = password;
        scope.register = { $invalid: false };
        scope.registerUser();
        httpBackend.expectPUT(url + '/api_v1/user/register_user_send_login_link', {
            username: username,
            email: email,
            password: password
        }).respond(400, joinFailed);
        httpBackend.flush();
        expect(window.ga).toHaveBeenCalledWith('send', 'event', 'error', 'register', 'username', username);
    });
});
