describe('mobbr.controllers: PersonController', function () {

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

    var personResult = {"result":{"user":{"gravatar":"7feaa503ff9b4873db1c17b8b188cb34","username":"Handijk","email":null,"status":"activated","kyc_level":"regular","currency_iso":"DKK","registerdatetime":"2013-09-24 02:19:05","lastlogindatetime":"2014-12-11 11:05:11","occupation":"Programmer","firstname":"Han","lastname":"Dijk","country_of_residence":"NL","nationality":"NL","language_iso":"EN","timezone":"Europe\/Amsterdam","companyname":"Han Dijk","vat_number":"NL171826838B02","thumbnail":"https:\/\/secure.gravatar.com\/avatar\/164618450a7f47f82c56119a238d156f?size=30&d=https:\/\/mobbr.com\/img\/default-gravatar2.png","id":["https:\/\/gravatar.com\/handijk","https:\/\/mobbr.com\/#\/person\/handijk","https:\/\/www.linkedin.com\/in\/handijk","mailto:administratie@handijk.nl","mailto:info@handijk.nl","mailto:test@handijk.nl"]},"url":["https:\/\/mobbr.com","https:\/\/test-www.mobbr.com","https:\/\/github.com\/mobbr\/mobbr-frontend\/issues\/84","https:\/\/github.com\/mobbr\/mobbr-frontend\/milestones\/wrap-up%20sprint%20v1.3","https:\/\/github.com\/mobbr\/mobbr-frontend\/issues\/258","https:\/\/github.com\/mobbr\/mobbr-frontend\/issues\/249","https:\/\/github.com\/mobbr\/mobbr-frontend\/issues\/226","https:\/\/github.com\/mobbr\/mobbr-lightbox","https:\/\/github.com\/mobbr\/mobbr-frontend\/milestones\/1.3%20UX%20redesign%20-%20functionality","https:\/\/github.com\/mobbr\/mobbr-api-angular","https:\/\/github.com\/mobbr\/mobbr-frontend\/milestones\/1.3%20UX%20redesign%20-%20visuals","http:\/\/ask.mobbr.com\/187\/where-is-the-add-payment-button","http:\/\/ask.mobbr.com\/197\/who-benefits-from-using-mobbr"],"domain":[{"host":"mobbr.com","favicon":"https:\/\/www.google.com\/s2\/favicons?domain=mobbr.com"},{"host":"test-www.mobbr.com","favicon":"https:\/\/www.google.com\/s2\/favicons?domain=test-www.mobbr.com"},{"host":"github.com","favicon":"https:\/\/www.google.com\/s2\/favicons?domain=github.com"},{"host":"ask.mobbr.com","favicon":"https:\/\/www.google.com\/s2\/favicons?domain=ask.mobbr.com"}],"language":["EN"],"currency":[],"stats":{"num_urls":"13","num_domain":"4","num_ids":"6"}},"message":null};
    var keywordsResult = {"result":[{"language_iso":"EN","keyword":"mobbr","num_payments":"14","num_urls":"10","num_domains":"2","amount":"58378.56045983994","currency_iso":"EUR"},{"language_iso":"EN","keyword":"coding","num_payments":"12","num_urls":"9","num_domains":"1","amount":"58268.56045983994","currency_iso":"EUR"},{"language_iso":"EN","keyword":"git","num_payments":"12","num_urls":"9","num_domains":"1","amount":"58268.56045983994","currency_iso":"EUR"},{"language_iso":"EN","keyword":"github","num_payments":"12","num_urls":"9","num_domains":"1","amount":"58268.56045983994","currency_iso":"EUR"},{"language_iso":"","keyword":"github.com","num_payments":"12","num_urls":"9","num_domains":"1","amount":"58316.56045983994","currency_iso":"EUR"},{"language_iso":"EN","keyword":"javascript programming","num_payments":"12","num_urls":"9","num_domains":"1","amount":"58268.56045983994","currency_iso":"EUR"},{"language_iso":"EN","keyword":"programming","num_payments":"12","num_urls":"9","num_domains":"1","amount":"58268.56045983994","currency_iso":"EUR"},{"language_iso":"EN","keyword":"software development","num_payments":"12","num_urls":"9","num_domains":"1","amount":"58268.56045983994","currency_iso":"EUR"},{"language_iso":"EN","keyword":"css programming","num_payments":"11","num_urls":"8","num_domains":"1","amount":"58018.56045983994","currency_iso":"EUR"},{"language_iso":"EN","keyword":"mobbr-frontend","num_payments":"10","num_urls":"7","num_domains":"1","amount":"57618.56045983994","currency_iso":"EUR"},{"language_iso":"EN","keyword":"high-prio","num_payments":"9","num_urls":"6","num_domains":"1","amount":"57418.56045983994","currency_iso":"EUR"},{"language_iso":"EN","keyword":"bug","num_payments":"5","num_urls":"4","num_domains":"1","amount":"57113.56045983994","currency_iso":"EUR"},{"language_iso":"EN","keyword":"enhancement","num_payments":"7","num_urls":"4","num_domains":"1","amount":"57365","currency_iso":"EUR"},{"language_iso":"EN","keyword":"readyfortesting","num_payments":"5","num_urls":"4","num_domains":"1","amount":"57113.56045983994","currency_iso":"EUR"},{"language_iso":"EN","keyword":"issue","num_payments":"3","num_urls":"3","num_domains":"1","amount":"340.5604598399365","currency_iso":"EUR"},{"language_iso":"EN","keyword":"medium-prio","num_payments":"4","num_urls":"3","num_domains":"1","amount":"57108","currency_iso":"EUR"},{"language_iso":"EN","keyword":"milestone","num_payments":"4","num_urls":"3","num_domains":"1","amount":"57108","currency_iso":"EUR"},{"language_iso":"EN","keyword":"question","num_payments":"5","num_urls":"3","num_domains":"2","amount":"57061.278022991995","currency_iso":"EUR"},{"language_iso":"","keyword":"ask.mobbr.com","num_payments":"4","num_urls":"2","num_domains":"1","amount":"111.27802299199682","currency_iso":"EUR"},{"language_iso":"EN","keyword":"blocked by api","num_payments":"3","num_urls":"2","num_domains":"1","amount":"57060","currency_iso":"EUR"},{"language_iso":"EN","keyword":"content","num_payments":"3","num_urls":"2","num_domains":"1","amount":"57060","currency_iso":"EUR"},{"language_iso":"EN","keyword":"qa","num_payments":"3","num_urls":"2","num_domains":"1","amount":"110.27802299199682","currency_iso":"EUR"},{"language_iso":"EN","keyword":"question2answer","num_payments":"3","num_urls":"2","num_domains":"1","amount":"110.27802299199682","currency_iso":"EUR"},{"language_iso":"EN","keyword":"business","num_payments":"2","num_urls":"1","num_domains":"1","amount":"110","currency_iso":"EUR"},{"language_iso":"EN","keyword":"business models","num_payments":"2","num_urls":"1","num_domains":"1","amount":"110","currency_iso":"EUR"},{"language_iso":"EN","keyword":"duplicate","num_payments":"2","num_urls":"1","num_domains":"1","amount":"42060","currency_iso":"EUR"},{"language_iso":"EN","keyword":"group","num_payments":"2","num_urls":"1","num_domains":"1","amount":"110","currency_iso":"EUR"},{"language_iso":"EN","keyword":"mobbr-api-angular","num_payments":"1","num_urls":"1","num_domains":"1","amount":"250","currency_iso":"EUR"},{"language_iso":"EN","keyword":"mobbr-lightbox","num_payments":"1","num_urls":"1","num_domains":"1","amount":"400","currency_iso":"EUR"},{"language_iso":"","keyword":"mobbr.com","num_payments":"1","num_urls":"1","num_domains":"1","amount":"12","currency_iso":"EUR"},{"language_iso":"EN","keyword":"money","num_payments":"2","num_urls":"1","num_domains":"1","amount":"1.2780229919968256","currency_iso":"EUR"},{"language_iso":"EN","keyword":"plugins and widgets","num_payments":"2","num_urls":"1","num_domains":"1","amount":"1.2780229919968256","currency_iso":"EUR"},{"language_iso":"EN","keyword":"readyfordesign","num_payments":"2","num_urls":"1","num_domains":"1","amount":"42060","currency_iso":"EUR"},{"language_iso":"EN","keyword":"reward","num_payments":"2","num_urls":"1","num_domains":"1","amount":"1.2780229919968256","currency_iso":"EUR"},{"language_iso":"EN","keyword":"target","num_payments":"2","num_urls":"1","num_domains":"1","amount":"110","currency_iso":"EUR"},{"language_iso":"","keyword":"test-www.mobbr.com","num_payments":"1","num_urls":"1","num_domains":"1","amount":"1","currency_iso":"EUR"},{"language_iso":"EN","keyword":"wontfix","num_payments":"2","num_urls":"1","num_domains":"1","amount":"42060","currency_iso":"EUR"}],"message":null};

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $httpBackend, mobbrSession, commonTest, mobbrMsg, $localStorage, $injector, $state, $filter) {
        controller = undefined;
        contr = $controller;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        common = commonTest;
        httpBackend = $httpBackend;
        state = $state;
        spyOn(scope, '$emit');

        $localStorage.token = undefined;
        // dummy login
        mobbrSession.setUser({ email: 'jan@work.com', id: [ 'http://github.com/test' ], username: 'Handijk', token: 'testtoken' });
        httpBackend.expectGET(url + '/api_v1/user/ping').respond(200, {});
        httpBackend.flush();

    }));

    function createController(username) {

        state.params = {
            username: username || null
        };

        contr('PersonController', {
            $scope: scope,
            $state: state,
            keywords: username ? keywordsResult : null,
            person: username ? personResult : null
        });
    }

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should assign the fetched resources to the scope', function () {

        createController('Handijk');

        expect(scope.username).toBe('Handijk');
        expect(scope.keywords).toBe(keywordsResult);
        expect(scope.person).toBe(personResult.result);

        expect(scope.$emit).toHaveBeenCalledWith('set-query', 'Handijk');
        expect(scope.$emit).toHaveBeenCalledWith('set-active-query', 'Handijk');
    });

    it('should open empty', function () {

        createController(null);

        expect(scope.username).toBe(null);
        expect(scope.keywords).toBe(null);
        expect(scope.person).toBe(null);

        expect(scope.$emit).toHaveBeenCalledWith('set-query', null);
        expect(scope.$emit).toHaveBeenCalledWith('set-active-query', null);
    });
});
