describe('mobbr.controllers: PaymentReceiptController', function () {

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
        session,
        window = {};

    var paymentInfoResult = {"result":{"id":"d410bb8aba8a11671f43d105ae28ec0c","uri":"https:\/\/github.com\/mobbr\/mobbr-frontend\/milestones\/wrap-up%20sprint%20v1.3","ref_uri":"https:\/\/test-www.mobbr.com\/#\/task\/aHR0cHM6Ly9naXRodWIuY29tL21vYmJyL21vYmJyLWZyb250ZW5kL21pbGVzdG9uZXMvd3JhcC11cCUyMHNwcmludCUyMHYxLjM=\/pay","img_uri":"https:\/\/images.weserv.nl?url=ssl:avatars0.githubusercontent.com%2Fu%2F710804%3Fv%3D3%26s%3D400&h=150&w=150&t=square&trim=20","paiddatetime":"2014-11-29 14:03:16","approveddatetime":null,"amount":"-12.00000000","currency_iso":"EUR","invoiced":"1","callback_url":null,"callback_datetime":null,"title":"Milestone #4 \"wrap-up sprint v1.3\" in Github repository mobbr\/mobbr-frontend","description":"All things left :)","copyright":null,"language_iso":"EN","mime_type":null,"memo":null,"domain":"github.com","favicon":"https:\/\/www.google.com\/s2\/favicons?domain=github.com","keywords":[{"keyword":"github.com","language_iso":""},{"keyword":"bug","language_iso":"EN"},{"keyword":"coding","language_iso":"EN"},{"keyword":"css programming","language_iso":"EN"},{"keyword":"git","language_iso":"EN"},{"keyword":"github","language_iso":"EN"},{"keyword":"github.com","language_iso":"EN"},{"keyword":"high-prio","language_iso":"EN"},{"keyword":"javascript programming","language_iso":"EN"},{"keyword":"medium-prio","language_iso":"EN"},{"keyword":"milestone","language_iso":"EN"},{"keyword":"mobbr","language_iso":"EN"},{"keyword":"mobbr-frontend","language_iso":"EN"},{"keyword":"programming","language_iso":"EN"},{"keyword":"readyfortesting","language_iso":"EN"},{"keyword":"software development","language_iso":"EN"}],"receivers":[{"gravatar":"3e5b6279e7c840161e53e762add9cfb9","username":"Handijk","share_id":"3306","amount":"11.19241158","currency_iso":"EUR","share":"93.27009646","role":"Programmer","unclaimed":null,"unclaim_id":null},{"gravatar":"e6032c3bbb3ece98d2782862594b08c2","username":"Patrick","share_id":"3303","amount":"0.26739550","currency_iso":"EUR","share":"2.22829582","role":"Issue closer","unclaimed":null,"unclaim_id":null},{"gravatar":"e6032c3bbb3ece98d2782862594b08c2","username":"Patrick","share_id":"3301","amount":"0.24829582","currency_iso":"EUR","share":"2.06913183","role":"Issue owner","unclaimed":null,"unclaim_id":null},{"gravatar":"7194e8d48fa1d2b689f99443b767316c","username":"7194e8d48fa1d2b689f99443b767316c","share_id":"3310","amount":"0.12000000","currency_iso":"EUR","share":"1.00000000","role":"Platform-owner","unclaimed":"mailto:octocat@github.com","unclaim_id":"3310"},{"gravatar":"e6032c3bbb3ece98d2782862594b08c2","username":"Patrick","share_id":"3302","amount":"0.05729904","currency_iso":"EUR","share":"0.47749196","role":"Issue commenter","unclaimed":null,"unclaim_id":null},{"gravatar":"3e5b6279e7c840161e53e762add9cfb9","username":"Handijk","share_id":"3305","amount":"0.03819936","currency_iso":"EUR","share":"0.31832797","role":"Issue commenter","unclaimed":null,"unclaim_id":null},{"gravatar":"e6032c3bbb3ece98d2782862594b08c2","username":"Patrick","share_id":"3304","amount":"0.01909968","currency_iso":"EUR","share":"0.15916399","role":"Programmer","unclaimed":null,"unclaim_id":null},{"gravatar":"3e5b6279e7c840161e53e762add9cfb9","username":"Handijk","share_id":"3307","amount":"0.01909968","currency_iso":"EUR","share":"0.15916399","role":"Issue owner","unclaimed":null,"unclaim_id":null},{"gravatar":"3e5b6279e7c840161e53e762add9cfb9","username":"Handijk","share_id":"3308","amount":"0.01909968","currency_iso":"EUR","share":"0.15916399","role":"Issue closer","unclaimed":null,"unclaim_id":null},{"gravatar":null,"username":"4b7224714697492a0b74c848f9da3371","share_id":"3309","amount":"0.01909968","currency_iso":"EUR","share":"0.15916399","role":"Issue owner","unclaimed":"https:\/\/github.com\/serverdotbiz","unclaim_id":"3309"}],"senders":[{"gravatar":"e6032c3bbb3ece98d2782862594b08c2","username":"Patrick","share_id":null,"amount":"-12.00000000","currency_iso":"EUR","share":"100.00000000","role":"Payer"}]},"message":null};
    var xPaymentInfoResult = {"result":{"id":"e0753dfda38c7e41bcef098da1f41932","prosumer":"Handijk","currency_iso":"EUR","amount":"-2.00000000","costs":"0.00000000","announceddatetime":"2014-07-28 17:02:48","paiddatetime":"2014-07-28 17:02:48","faileddatetime":null,"receive_address":"TRIONL2U:nl19trio0254730329","payment_service":"mangopay","ext_trx_id":"6087322","note":"","confirmation_key":null,"service_message":null},"message":null};

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $httpBackend, mobbrSession, commonTest, mobbrMsg, $localStorage, $injector, $state) {
        controller = undefined;
        contr = $controller;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        common = commonTest;
        httpBackend = $httpBackend;
        state = $state;
        session = mobbrSession;
        window.saveAs = function () {};
        window.Blob = function () {};
        scope.scrollTo = function () {};
        spyOn(window, 'saveAs');
        spyOn(scope, 'scrollTo');

        $localStorage.token = undefined;
    }));

    function createController(id, external, auth, username) {

        if (auth) {
            // dummy login
            session.setUser({ email: 'jan@work.com', id: [ 'http://github.com/test' ], username: 'Handijk', token: 'testtoken' });
            httpBackend.expectGET(url + '/api_v1/user/ping').respond(200, {});
            httpBackend.flush();
        }

        state.params = { id: id };
        if (username) {
            state.params.username = username;
        }

        contr('PaymentReceiptController', {
            $scope: scope,
            $state: state,
            $window: window,
            payment: external ? xPaymentInfoResult : paymentInfoResult
        });

        rootScope.$broadcast('$stateChangeSuccess', { name: external ? 'x-payment' : 'payment' }, {});
    }

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should show an external payment receipt', function () {

        createController('e0753dfda38c7e41bcef098da1f41932', true, true);

        expect(scope.selectAll.selected).toBe(false);
        expect(scope.payment).toBe(xPaymentInfoResult);
        expect(scope.scrollTo).not.toHaveBeenCalled();
    });

    it('should convert any number to a positive', function () {

        createController('e0753dfda38c7e41bcef098da1f41932', true);

        expect(scope.abs(-3)).toBe(3);
        expect(scope.abs(-3.632)).toBe(3.632);
        expect(scope.abs(3)).toBe(3);
    });

    it('should show an internal payment receipt with a logged in user', function () {

        createController('d410bb8aba8a11671f43d105ae28ec0c', false, true);

        expect(scope.payment).toBe(paymentInfoResult);
        expect(scope.selectAll.selected).toBe(false);
        expect(scope.scrollTo).toHaveBeenCalled();
        expect(scope.thisUser).toBe('Handijk');
        expect(scope.unclaimed).toBe(false);
        expect(scope.userAmount).toBe(11.2688103 );
        expect(scope.userPaid).toBe(0);
        expect(scope.receiversAndSenders.length).toBe(11);
    });

    it('should show an internal payment receipt with a not logged in user', function () {

        createController('d410bb8aba8a11671f43d105ae28ec0c', false, false);

        expect(scope.payment).toBe(paymentInfoResult);
        expect(scope.selectAll.selected).toBe(false);
        expect(scope.scrollTo).toHaveBeenCalled();
        expect(scope.thisUser).toBe(false);
        expect(scope.unclaimed).toBe(false);
        expect(scope.userAmount).toBe(0);
        expect(scope.userPaid).toBe(0);
        expect(scope.receiversAndSenders.length).toBe(11);
    });

    it('should show an internal payment receipt with a logged in user and a selected user with an unclaimed share', function () {

        createController('d410bb8aba8a11671f43d105ae28ec0c', false, true, '4b7224714697492a0b74c848f9da3371');

        expect(scope.payment).toBe(paymentInfoResult);
        expect(scope.selectAll.selected).toBe(false);
        expect(scope.scrollTo).toHaveBeenCalled();
        expect(scope.thisUser).toBe('4b7224714697492a0b74c848f9da3371');
        expect(scope.unclaimed).toBe(true);
        expect(scope.userAmount).toBe(0.01909968);
        expect(scope.userPaid).toBe(0);
        expect(scope.receiversAndSenders.length).toBe(11);
    });

    it('should show an internal payment receipt with a logged out user and a selected user with an unclaimed share', function () {

        createController('d410bb8aba8a11671f43d105ae28ec0c', false, true, '4b7224714697492a0b74c848f9da3371');

        expect(scope.payment).toBe(paymentInfoResult);
        expect(scope.selectAll.selected).toBe(false);
        expect(scope.scrollTo).toHaveBeenCalled();
        expect(scope.thisUser).toBe('4b7224714697492a0b74c848f9da3371');
        expect(scope.unclaimed).toBe(true);
        expect(scope.userAmount).toBe(0.01909968);
        expect(scope.userPaid).toBe(0);
        expect(scope.receiversAndSenders.length).toBe(11);
    });

    it('should show an internal payment receipt with a logged out user and a selected user who has paid to this url', function () {

        createController('d410bb8aba8a11671f43d105ae28ec0c', false, true, 'Patrick');

        expect(scope.payment).toBe(paymentInfoResult);
        expect(scope.selectAll.selected).toBe(false);
        expect(scope.scrollTo).toHaveBeenCalled();
        expect(scope.thisUser).toBe('Patrick');
        expect(scope.unclaimed).toBe(false);
        expect(scope.userAmount).toBe(0.5920900399999999);
        expect(scope.userPaid).toBe(-12);
        expect(scope.receiversAndSenders.length).toBe(11);
    });

    it('should select all selectable shares', function () {

        createController('d410bb8aba8a11671f43d105ae28ec0c', false, true, 'Patrick');

        scope.selectAll.selected = true;
        scope.$digest();

        angular.forEach(scope.receiversAndSenders, function (participant) {
            if (participant.share_id) {
                expect(participant.selected).toBe(true);
            }
        });

        scope.selectAll.selected = false;
        scope.$digest();

        angular.forEach(scope.receiversAndSenders, function (participant) {
            if (participant.share_id) {
                expect(participant.selected).toBe(false);
            }
        });
    });

    it('should download invoices for all selected shares', function () {

        createController('d410bb8aba8a11671f43d105ae28ec0c', false, true, 'Patrick');

        scope.selectAll.selected = true;
        scope.$digest();

        angular.forEach(scope.receiversAndSenders, function (participant) {
            if (participant.share_id) {
                expect(participant.selected).toBe(true);
            }
        });

        scope.download();

        httpBackend.expectGET(url + '/api_v1/invoices?share_ids=3306&share_ids=3303&share_ids=3301&share_ids=3310&share_ids=3302&share_ids=3305&share_ids=3304&share_ids=3307&share_ids=3308&share_ids=3309').respond(200, { data: 'test', type: 'test'});
        httpBackend.flush();
        expect(window.saveAs).toHaveBeenCalled();
    });
});