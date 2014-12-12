describe('mobbr.controllers: LinkLoginController', function () {

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

    var loginlinkResult = {"result":{"username":"Handijk","email":"info@handijk.nl","status":"activated","currency_iso":"DKK","registerdatetime":"2013-09-24 02:19:05","lastlogindatetime":"2014-12-10 12:36:16","lastupdateddatetime":"2014-12-10 13:40:01","kyclightdatetime":null,"kycregulardatetime":null,"updatesdatetime":null,"kyc_level":"regular","language_iso":"EN","timezone":"Europe\/Amsterdam","bitcoin_address":null,"ripple_address":null,"firstname":"Han","lastname":"Dijk","birthday":"1981-06-18","address":"Pathmossingel 98, Enschede","country_of_residence":"NL","occupation":"Programmer","income_range":"2","nationality":"NL","mangopay_identity_proof":"VALIDATED","mangopay_address_proof":"PROOF_REQUIRED","companyname":"Han Dijk","vat_number":"NL171826838B02","vat_rate":"21","bio":null,"invoice_numbering_prefix":"handijk-","invoice_numbering_postfix":null,"id":["https:\/\/github.com\/handijk","https:\/\/gravatar.com\/handijk","https:\/\/mobbr.com\/#\/person\/handijk","https:\/\/www.linkedin.com\/in\/handijk","mailto:info@handijk.nl"],"token":"95905223da0e36be240f08a6268d2660","thumbnail":"https:\/\/secure.gravatar.com\/avatar\/3e5b6279e7c840161e53e762add9cfb9?size=30&d=https:\/\/mobbr.com\/img\/default-gravatar2.png","setting":{"hide_my_profile":"0","hide_my_outgoing_payments":"0","hide_my_incoming_payments":"0","hide_my_items":"0","send_invoice_download_notification":"1","send_task_invitation_notification":"1","hide_my_email_from_donators":"1","hide_my_email_from_public":"1","send_monthly_reports":"1","send_newsletter":"1","send_json_mention_notification":"1","send_payment_received_notification":"1","send_payment_expired_notification":"1"},"msg":[]},"message":{"text":"Your account was logged in","type":"info"}};
    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $httpBackend, mobbrSession, commonTest, mobbrMsg, $localStorage, $injector, $state, $filter) {
        controller = undefined;
        contr = $controller;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        common = commonTest;
        httpBackend = $httpBackend;
        state = $state;
        spyOn(state, 'go');

        $localStorage.token = undefined;
        // dummy login
        mobbrSession.setUser({ email: 'jan@work.com', id: [ 'http://github.com/test' ], username: 'Handijk', token: 'testtoken' });
        httpBackend.expectGET('https://test-api.mobbr.com/api_v1/user/ping').respond(200, {});
        httpBackend.flush();

    }));

    function createController(withHash) {

        contr('LinkLoginController', {
            $scope: scope,
            $state: state,
            $stateParams: { hash: withHash }
        });
    }

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should log the user in with a login key and redirect to updates', function () {

        var hash ='adcf161228b808de7cb3e02dd4f17d17';

        createController(hash);
        httpBackend.expectPUT('https://test-api.mobbr.com/api_v1/user/link_login', { login_token: hash }).respond(200, loginlinkResult);
        httpBackend.expectGET('https://test-api.mobbr.com/api_v1/user/ping').respond(200, {});
        httpBackend.flush();
        expect(state.go).toHaveBeenCalledWith('updates');
    });

    it('should redirect to the homepage with a faulty login key', function () {

        var hash ='faulty';

        createController(hash);
        httpBackend.expectPUT('https://test-api.mobbr.com/api_v1/user/link_login', { login_token: hash }).respond(400, loginlinkResult);
        httpBackend.flush();
        expect(state.go).toHaveBeenCalledWith('main');
    });
});
