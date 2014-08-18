describe('mobbr.controllers: PaymentReceiptController', function () {
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
        iMobbrMsg,
        stateParams;

//    var UPDATE_USER_ENDPOINT = 'https://test-api.mobbr.com/api_v1/user/update_user';


    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $httpBackend, mobbrSession, commonTest, mobbrMsg, $timeout) {
        contr = $controller;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        common = commonTest;
        iMobbrMsg = mobbrMsg;
        httpBackend = $httpBackend;

        // dummy login
        mobbrSession.setUser({email: 'jan@work.com', id: ['http://github.com/test']});

        stateParams = {id: 123};

    }));

    function expectRetrievePayment() {
        httpBackend.expectGET(common.baseUrl + 'payments/info?id=' + stateParams.id).respond(200, {"result": {"id": "7cc0d3c24cefccca01a0b13d06f2abec", "uri": "https:\/\/github.com\/chriskacerguis\/codeigniter-restserver", "ref_uri": "https:\/\/test-api.mobbr.com", "img_uri": "https:\/\/images.weserv.nl?url=ssl:avatars1.githubusercontent.com%2Fu%2F2414647%3Fv%3D2%26s%3D400&h=150&w=150&t=square&trim=20", "paiddatetime": "2014-08-08 15:54:31", "amount": "-3.00000000", "currency_iso": "EUR", "invoiced": "0", "callback_url": null, "callback_datetime": null, "title": null, "description": "A fully RESTful server implementation for CodeIgniter using one library, one config file and one controller.", "copyright": null, "language_iso": "EN", "mime_type": null, "memo": null, "domain": "github.com", "favicon": "https:\/\/www.google.com\/s2\/favicons?domain=github.com", "keywords": [
            {"keyword": "git", "language_iso": "EN"},
            {"keyword": "PHP programming", "language_iso": "EN"},
            {"keyword": "programming", "language_iso": "EN"},
            {"keyword": "social coding", "language_iso": "EN"},
            {"keyword": "software development", "language_iso": "EN"}
        ], "receivers": [
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.30000000", "currency_iso": "EUR", "share": "10.00000000", "role": "Platform-owner", "unclaimed": "1", "unclaim_id": "1083"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00326481", "currency_iso": "EUR", "share": "0.10882709", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1084"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00244861", "currency_iso": "EUR", "share": "0.08162031", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1085"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00326481", "currency_iso": "EUR", "share": "0.10882709", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1086"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.07345828", "currency_iso": "EUR", "share": "2.44860943", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1087"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.03509674", "currency_iso": "EUR", "share": "1.16989117", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1088"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.02611850", "currency_iso": "EUR", "share": "0.87061669", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1089"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.02122128", "currency_iso": "EUR", "share": "0.70737606", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1090"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00326481", "currency_iso": "EUR", "share": "0.10882709", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1091"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.01387545", "currency_iso": "EUR", "share": "0.46251511", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1092"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00244861", "currency_iso": "EUR", "share": "0.08162031", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1093"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.07019347", "currency_iso": "EUR", "share": "2.33978235", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1094"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00408102", "currency_iso": "EUR", "share": "0.13603386", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1095"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00816203", "currency_iso": "EUR", "share": "0.27206771", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1096"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00652963", "currency_iso": "EUR", "share": "0.21765417", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1097"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00816203", "currency_iso": "EUR", "share": "0.27206771", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1098"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00816203", "currency_iso": "EUR", "share": "0.27206771", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1099"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00816203", "currency_iso": "EUR", "share": "0.27206771", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1100"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00326481", "currency_iso": "EUR", "share": "0.10882709", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1101"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00571342", "currency_iso": "EUR", "share": "0.19044740", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1102"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00571342", "currency_iso": "EUR", "share": "0.19044740", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1103"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00571342", "currency_iso": "EUR", "share": "0.19044740", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1104"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00489722", "currency_iso": "EUR", "share": "0.16324063", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1105"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00571342", "currency_iso": "EUR", "share": "0.19044740", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1106"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00489722", "currency_iso": "EUR", "share": "0.16324063", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1107"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00571342", "currency_iso": "EUR", "share": "0.19044740", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1108"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00571342", "currency_iso": "EUR", "share": "0.19044740", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1109"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00489722", "currency_iso": "EUR", "share": "0.16324063", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1110"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00408102", "currency_iso": "EUR", "share": "0.13603386", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1111"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00408102", "currency_iso": "EUR", "share": "0.13603386", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1112"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00326481", "currency_iso": "EUR", "share": "0.10882709", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1113"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00489722", "currency_iso": "EUR", "share": "0.16324063", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1114"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00326481", "currency_iso": "EUR", "share": "0.10882709", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1115"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00408102", "currency_iso": "EUR", "share": "0.13603386", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1116"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00408102", "currency_iso": "EUR", "share": "0.13603386", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1117"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00408102", "currency_iso": "EUR", "share": "0.13603386", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1118"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00408102", "currency_iso": "EUR", "share": "0.13603386", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1119"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00408102", "currency_iso": "EUR", "share": "0.13603386", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1120"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00326481", "currency_iso": "EUR", "share": "0.10882709", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1121"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00326481", "currency_iso": "EUR", "share": "0.10882709", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1122"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00408102", "currency_iso": "EUR", "share": "0.13603386", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1123"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.08243652", "currency_iso": "EUR", "share": "2.74788392", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1124"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.01142684", "currency_iso": "EUR", "share": "0.38089480", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1125"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00489722", "currency_iso": "EUR", "share": "0.16324063", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1126"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00734583", "currency_iso": "EUR", "share": "0.24486094", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1127"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00408102", "currency_iso": "EUR", "share": "0.13603386", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1128"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00979444", "currency_iso": "EUR", "share": "0.32648126", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1129"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00489722", "currency_iso": "EUR", "share": "0.16324063", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1130"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00816203", "currency_iso": "EUR", "share": "0.27206771", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1131"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.02693470", "currency_iso": "EUR", "share": "0.89782346", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1132"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.02366989", "currency_iso": "EUR", "share": "0.78899637", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1133"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.04489117", "currency_iso": "EUR", "share": "1.49637243", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1134"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00652963", "currency_iso": "EUR", "share": "0.21765417", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1135"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00897823", "currency_iso": "EUR", "share": "0.29927449", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1136"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.06611245", "currency_iso": "EUR", "share": "2.20374849", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1137"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00897823", "currency_iso": "EUR", "share": "0.29927449", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1138"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.00652963", "currency_iso": "EUR", "share": "0.21765417", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1139"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.02203748", "currency_iso": "EUR", "share": "0.73458283", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1140"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.01142684", "currency_iso": "EUR", "share": "0.38089480", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1141"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.36157799", "currency_iso": "EUR", "share": "12.05259976", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1142"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.02285369", "currency_iso": "EUR", "share": "0.76178960", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1143"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.02448609", "currency_iso": "EUR", "share": "0.81620314", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1144"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.01469166", "currency_iso": "EUR", "share": "0.48972189", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1145"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.53461306", "currency_iso": "EUR", "share": "17.82043531", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1146"},
            {"gravatar": "d41d8cd98f00b204e9800998ecf8427e", "username": "<unclaimed>", "amount": "0.98189238", "currency_iso": "EUR", "share": "32.72974607", "role": "Contributor", "unclaimed": "1", "unclaim_id": "1147"}
        ], "senders": [
            {"gravatar": "6d03888a00d6e02a191496d75419f4bc", "username": "1407505993", "amount": "-3.00000000", "currency_iso": "EUR", "share": "100.00000000", "role": "Payer"}
        ]}, "message": null});
    }

    function createController() {
        expectRetrievePayment();
        contr('PaymentReceiptController', {
            $scope: scope,
            $stateParams: stateParams
        });

    }

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should retrieved the given payment', function () {
        createController();
        httpBackend.flush();

        expect(scope.payment).not.toBe(undefined);
        expect(scope.payment.amount).toBe('-3.00000000');
    });

    it('should select all recievers that are unclaimed', function () {
        createController();
        httpBackend.flush();

        scope.selectAll.selected = true;
        scope.$apply();

        expect(scope.filterSelectedIds(scope.recieversAndSenders).length).toBe(65);

        scope.selectAll.selected = false;
        scope.$apply();

        expect(scope.filterSelectedIds(scope.recieversAndSenders).length).toBe(0);
    });

    it('should revoke selected payments', function () {
        createController();
        httpBackend.flush();

        scope.recieversAndSenders[50].selected = true;
        scope.revokeSelected();

        httpBackend.expectDELETE(common.baseUrl + 'payments/unclaimed_shares?ids=1132').respond(200, {});
        expectRetrievePayment();

        httpBackend.flush();
    });

});