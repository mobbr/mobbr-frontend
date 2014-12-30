describe('mobbr.controllers: UpdateEmailController', function () {

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

    var updateEmailResult = {"result":{"username":"Handijk","email":"administratie@handijk.nl","status":"activated","currency_iso":"DKK","registerdatetime":"2013-09-24 02:19:05","lastlogindatetime":"2014-12-10 20:08:07","lastupdateddatetime":"2014-12-11 10:43:43","kyclightdatetime":null,"kycregulardatetime":null,"updatesdatetime":null,"kyc_level":"regular","language_iso":"EN","timezone":"Europe\/Amsterdam","bitcoin_address":null,"ripple_address":null,"setting_hide_my_profile":"0","setting_hide_my_outgoing_payments":"0","setting_hide_my_incoming_payments":"0","setting_hide_my_items":"0","setting_send_invoice_download_notification":"1","setting_send_task_invitation_notification":"1","setting_hide_my_email_from_donators":"1","setting_hide_my_email_from_public":"1","setting_send_monthly_reports":"1","setting_send_newsletter":"1","setting_send_json_mention_notification":"1","setting_send_payment_received_notification":"1","setting_send_payment_expired_notification":"1","firstname":"Han","lastname":"Dijk","birthday":"1981-06-18 00:00:00","address":"Pathmossingel 98, Enschede","country_of_residence":"NL","occupation":"Programmer","income_range":"2","nationality":"NL","mangopay_id":"4168100","mangopay_identity_proof_id":"9145091","mangopay_address_proof_id":null,"mangopay_identity_proof":"VALIDATED","mangopay_address_proof":"PROOF_REQUIRED","companyname":"Han Dijk","vat_number":"NL171826838B02","vat_rate":"21","bio":null,"invoice_numbering_prefix":"handijk-","invoice_numbering_postfix":null,"id":["https:\/\/github.com\/handijk","https:\/\/gravatar.com\/handijk","https:\/\/mobbr.com\/#\/person\/handijk","https:\/\/www.linkedin.com\/in\/handijk","mailto:administratie@handijk.nl","mailto:info@handijk.nl"],"token":"7aa2176babc632ac56869ae177a5a8d7","thumbnail":"https:\/\/secure.gravatar.com\/avatar\/7feaa503ff9b4873db1c17b8b188cb34?size=30&d=https:\/\/mobbr.com\/img\/default-gravatar2.png"},"message":{"text":"Your email has been changed from info@handijk.nl to administratie@handijk.nl, both addresses are now in your list of id's","type":"info"}}
    // Initialize the controller and a mock scope
    var url;
    beforeEach(inject(function ($controller, $rootScope, $httpBackend, mobbrSession, commonTest, mobbrMsg, $localStorage, $injector, $state, $filter, apiUrl) {
        url = apiUrl;
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
        httpBackend.expectGET(url + '/api_v1/user/ping').respond(200, {});
        httpBackend.flush();

    }));

    function createController(withHash) {

        state.params = { hash: withHash };

        contr('UpdateEmailController', {
            $scope: scope,
            $state: state
        });
    }

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should update the users email address and redirect to the account settings', function () {

        var hash = 'e5cf338e481cc57f164ef827da71cf61';

        createController(hash);
        httpBackend.expectPOST(url + '/api_v1/user/confirm_email', { update_token: hash }).respond(200, updateEmailResult);
        httpBackend.expectGET(url + '/api_v1/user/ping').respond(200, {});
        httpBackend.flush();
        expect(state.go).toHaveBeenCalledWith('settings.account');
    });

    it('should redirect to the homepage with a faulty update key', function () {

        var hash ='faulty';

        createController(hash);
        httpBackend.expectPOST(url + '/api_v1/user/confirm_email', { update_token: hash }).respond(400, updateEmailResult);
        httpBackend.flush();
        expect(state.go).toHaveBeenCalledWith('main');
    });
});
