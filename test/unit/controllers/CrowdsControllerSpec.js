describe('mobbr.controllers: CrowdsController', function () {
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
        state;

    var peopleResult = {'result': [
        {'gravatar': '3e5b6279e7c840161e53e762add9cfb9', 'id': 'Handijk', 'num_rewards': '12', 'num_tasks': '3', 'num_domains': '1', 'num_keywords': '1', 'keyword': ['Business models'], 'role': ['QA community member', 'QA thread answerer']},
        {'gravatar': 'e669f621dcb8a7527a25fb6eee7b4633', 'id': 'Jochem_Koole', 'num_rewards': '1', 'num_tasks': '1', 'num_domains': '1', 'num_keywords': '2', 'keyword': ['business', 'Brainstorm'], 'role': ['QA thread answerer']},
        {'gravatar': 'a4856386bcdf172157135754617fc88b', 'id': 'Ernesto', 'num_rewards': '8', 'num_tasks': '4', 'num_domains': '2', 'num_keywords': '3', 'keyword': ['test', 'Business models', 'Vragen'], 'role': ['QA platform owner', 'QA community member']},
        {'gravatar': 'e6032c3bbb3ece98d2782862594b08c2', 'id': 'Patrick', 'num_rewards': '15', 'num_tasks': '5', 'num_domains': '2', 'num_keywords': '8', 'keyword': ['cultuur', 'erfgoed', 'archieven', 'Business models', 'klantbinding', 'Brainstorm', 'musea', 'popmuziek'], 'role': ['QA thread answerer', 'QA community member']},
        {'gravatar': 'ebbd3335e291c9a912f6333a8bd98e51', 'id': 'Lykle', 'num_rewards': '7', 'num_tasks': '5', 'num_domains': '1', 'num_keywords': '13', 'keyword': ['erfgoed', 'Onderzoek', 'archieven', 'klantbinding', 'community', 'Brainstorm', 'business', 'tv', 'musea', 'popmuziek', 'onderwijs', 'cultuur', 'muziek'], 'role': ['QA thread answerer']},
        {'gravatar': '76ebe2234103bc2301c76ea5651fb166', 'id': 'Mobbr', 'num_rewards': '6', 'num_tasks': '3', 'num_domains': '1', 'num_keywords': '1', 'keyword': ['Business models'], 'role': ['QA platform owner']},
        {'gravatar': '184e6e88ff2e57ec2f6c2d917a8c2f68', 'id': 'Elja', 'num_rewards': '1', 'num_tasks': '1', 'num_domains': '1', 'num_keywords': '6', 'keyword': ['Brainstorm', 'cultuur', 'muziek', 'community', 'klantbinding', 'tv'], 'role': ['QA thread answerer']},
        {'gravatar': 'c812d14ead5bb1cf0934fdbdf4cbb1c3', 'id': 'hollandstar', 'num_rewards': '3', 'num_tasks': '2', 'num_domains': '1', 'num_keywords': '8', 'keyword': ['business', 'klantbinding', 'tv', 'Brainstorm', 'cultuur', 'Onderzoek', 'muziek', 'community'], 'role': ['QA thread answerer']},
        {'gravatar': 'b8170408363aa47915fc5cdfb1c35d19', 'id': 'jorenvrancken', 'num_rewards': '4', 'num_tasks': '3', 'num_domains': '1', 'num_keywords': '9', 'keyword': ['klantbinding', 'tv', 'Onderzoek', 'onderwijs', 'Brainstorm', 'cultuur', 'muziek', 'business', 'community'], 'role': ['QA thread answerer']},
        {'gravatar': '46f9cd74dee853cbd9420e6a8e809b0e', 'id': 'erwblo', 'num_rewards': '39', 'num_tasks': '8', 'num_domains': '1', 'num_keywords': '17', 'keyword': ['community', 'Brainstorm', 'startups', 'cultuur', 'popmuziek', 'onderwijs', 'klantbinding', 'media', 'Onderzoek', 'business', 'tv', 'schaatsen', 'muziek', 'musea', 'erfgoed', 'archieven', 'sport'], 'role': ['QA platform owner', 'QA thread answerer', 'QA community member']},
        {'gravatar': 'd6c2f16e7fd60fc062aabccd85eb658a', 'id': 'Leonieke', 'num_rewards': '25', 'num_tasks': '8', 'num_domains': '1', 'num_keywords': '17', 'keyword': ['tv', 'business', 'media', 'Brainstorm', 'startups', 'klantbinding', 'onderwijs', 'musea', 'popmuziek', 'schaatsen', 'cultuur', 'sport', 'muziek', 'Onderzoek', 'erfgoed', 'archieven', 'community'], 'role': ['QA community member', 'QA thread answerer']},
        {'gravatar': '27bd0dbd4c48106c7766e31cb71a8c20', 'id': 'lennard', 'num_rewards': '20', 'num_tasks': '8', 'num_domains': '1', 'num_keywords': '17', 'keyword': ['schaatsen', 'archieven', 'business', 'Brainstorm', 'erfgoed', 'klantbinding', 'Onderzoek', 'community', 'sport', 'tv', 'popmuziek', 'cultuur', 'startups', 'musea', 'onderwijs', 'media', 'muziek'], 'role': ['QA community member', 'QA thread answerer']},
        {'gravatar': '75228a9f9dd99fb8f49d3fb773d9de76', 'id': 'arjendouwes', 'num_rewards': '8', 'num_tasks': '3', 'num_domains': '2', 'num_keywords': '18', 'keyword': ['Trompet', 'Muziek', 'Arjen Douwes', 'business', 'startups', 'Saxofoon', 'Fellows Bigband', 'Trombone', 'Amstelveen', 'community', 'Jazz', 'Amsterdam', 'klantbinding', 'tv', 'media', 'Brainstorm', 'Saxoffon', 'cultuur'], 'role': ['webmaster', 'QA thread answerer']},
        {'gravatar': 'e8ea9cfa692b4de2c322c82ce01917a1', 'id': 'ErnieFK', 'num_rewards': '2', 'num_tasks': '1', 'num_domains': '1', 'num_keywords': '2', 'keyword': ['Vragen', 'test'], 'role': ['QA community member']},
        {'gravatar': 'a22952df6ebd88910368eb9c2fa638aa', 'id': 'PeterKorevaar', 'num_rewards': '1', 'num_tasks': '1', 'num_domains': '1', 'num_keywords': '2', 'keyword': ['onderwijs', 'Onderzoek'], 'role': ['QA thread answerer']},
        {'gravatar': '7c9dfb9903586605e6c633049cfddd92', 'id': 'coen', 'num_rewards': '2', 'num_tasks': '1', 'num_domains': '1', 'num_keywords': '3', 'keyword': ['schaatsen', 'Brainstorm', 'sport'], 'role': ['QA thread answerer']},
        {'gravatar': '180bc68e2de11d5eab612365773ade42', 'id': 'iphi', 'num_rewards': '2', 'num_tasks': '1', 'num_domains': '1', 'num_keywords': '4', 'keyword': ['Brainstorm', 'klantbinding', 'popmuziek', 'cultuur'], 'role': ['QA thread answerer']},
        {'gravatar': 'cd4752ca56fcf838bccfe32a4824c193', 'id': 'Edwinres', 'num_rewards': '6', 'num_tasks': '3', 'num_domains': '1', 'num_keywords': '6', 'keyword': ['business', 'media', 'Brainstorm', 'Onderzoek', 'onderwijs', 'startups'], 'role': ['QA thread answerer']},
        {'gravatar': '5f7a5038dc8c8d652bd10f662e564865', 'id': 'ronaldmulder', 'num_rewards': '4', 'num_tasks': '3', 'num_domains': '1', 'num_keywords': '6', 'keyword': ['Onderzoek', 'musea', 'Brainstorm', 'business', 'erfgoed', 'archieven'], 'role': ['QA thread answerer']},
        {'gravatar': '73e7a90848de87ffb7b6d95df4d06c60', 'id': 'erikvisser', 'num_rewards': '1', 'num_tasks': '1', 'num_domains': '1', 'num_keywords': '6', 'keyword': ['tv', 'Brainstorm', 'cultuur', 'muziek', 'community', 'klantbinding'], 'role': ['QA thread answerer']},
        {'gravatar': '3caa53e93d7edd0b87dc3dfdc91a2502', 'id': 'ErnestoMobbr', 'num_rewards': '13', 'num_tasks': '6', 'num_domains': '1', 'num_keywords': '11', 'keyword': ['cultuur', 'business', 'startups', 'schaatsen', 'Brainstorm', 'popmuziek', 'media', 'Onderzoek', 'onderwijs', 'klantbinding', 'sport'], 'role': ['QA community member', 'QA thread answerer']},
        {'gravatar': '17f6f173442fc22f2f6331bc207b435d', 'id': 'Rimantas', 'num_rewards': '6', 'num_tasks': '3', 'num_domains': '1', 'num_keywords': '1', 'keyword': ['Business models'], 'role': ['QA community member']},
        {'gravatar': 'eb540b3d67f94442de07b0c63e1ed6a1', 'id': 'Robbert', 'num_rewards': '6', 'num_tasks': '3', 'num_domains': '1', 'num_keywords': '1', 'keyword': ['Business models'], 'role': ['QA community member']},
        {'gravatar': 'eff8f48ed73b7952ea6e1ec6cc5d2c37', 'id': 'PeterG', 'num_rewards': '1', 'num_tasks': '1', 'num_domains': '1', 'num_keywords': '2', 'keyword': ['business', 'Brainstorm'], 'role': ['QA thread answerer']},
        {'gravatar': '0a3cc40b2f403b3c58bcb5cdd4a17d22', 'id': 'jorritbrenninkmeijer', 'num_rewards': '2', 'num_tasks': '1', 'num_domains': '1', 'num_keywords': '3', 'keyword': ['Brainstorm', 'sport', 'schaatsen'], 'role': ['QA thread answerer']},
        {'gravatar': '12c069588d3878a3a5d1f875beb333b3', 'id': 'raimond1978', 'num_rewards': '2', 'num_tasks': '2', 'num_domains': '1', 'num_keywords': '4', 'keyword': ['business', 'Brainstorm', 'Onderzoek', 'onderwijs'], 'role': ['QA thread answerer']},
        {'gravatar': '181a0d1145b55f1befcc95675395b1bc', 'id': 'yvoschaap', 'num_rewards': '3', 'num_tasks': '1', 'num_domains': '1', 'num_keywords': '4', 'keyword': ['startups', 'media', 'Brainstorm', 'business'], 'role': ['QA thread answerer']},
        {'gravatar': '34dc97999c876f5a89b23f5af6c149ca', 'id': 'arne', 'num_rewards': '2', 'num_tasks': '1', 'num_domains': '1', 'num_keywords': '4', 'keyword': ['cultuur', 'klantbinding', 'Brainstorm', 'popmuziek'], 'role': ['QA thread answerer']},
        {'gravatar': '52ce1c4a80978d885ca6ea3810ac03cd', 'id': 'Kim_Winkelaar', 'num_rewards': '2', 'num_tasks': '1', 'num_domains': '1', 'num_keywords': '4', 'keyword': ['klantbinding', 'Brainstorm', 'popmuziek', 'cultuur'], 'role': ['QA thread answerer']},
        {'gravatar': '8a9394484cc8c531ccbbdb528ff365d7', 'id': 'eef_mobbr', 'num_rewards': '1', 'num_tasks': '1', 'num_domains': '1', 'num_keywords': '4', 'keyword': ['musea', 'Brainstorm', 'erfgoed', 'archieven'], 'role': ['QA thread answerer']},
        {'gravatar': '8cd3945908494304886d02297fa0ec8f', 'id': 'jaspervisser', 'num_rewards': '1', 'num_tasks': '1', 'num_domains': '1', 'num_keywords': '4', 'keyword': ['erfgoed', 'archieven', 'musea', 'Brainstorm'], 'role': ['QA thread answerer']},
        {'gravatar': 'c14b462c45f2a5f2f7c56790eb53b12b', 'id': 'MarjaRuigrok', 'num_rewards': '1', 'num_tasks': '1', 'num_domains': '1', 'num_keywords': '4', 'keyword': ['musea', 'Brainstorm', 'erfgoed', 'archieven'], 'role': ['QA thread answerer']},
        {'gravatar': '6e86c8956fa6323e8b227db933cbc13c', 'id': 'jvrijn', 'num_rewards': '5', 'num_tasks': '4', 'num_domains': '1', 'num_keywords': '7', 'keyword': ['erfgoed', 'archieven', 'Onderzoek', 'business', 'musea', 'Brainstorm', 'onderwijs'], 'role': ['QA thread answerer']},
        {'gravatar': '176c6fe09be502bd54736e8b223d594d', 'id': 'Mafti', 'num_rewards': '4', 'num_tasks': '3', 'num_domains': '1', 'num_keywords': '7', 'keyword': ['schaatsen', 'Brainstorm', 'sport', 'erfgoed', 'archieven', 'musea', 'business'], 'role': ['QA thread answerer']},
        {'gravatar': '1b4c956abcc31b08efc15795b8adc0c8', 'id': 'wilg', 'num_rewards': '4', 'num_tasks': '2', 'num_domains': '1', 'num_keywords': '7', 'keyword': ['Brainstorm', 'musea', 'business', 'startups', 'erfgoed', 'archieven', 'media'], 'role': ['QA thread answerer']},
        {'gravatar': '34a991df3d67e7fd7df7a492ee42c27a', 'id': 'Patman', 'num_rewards': '1', 'num_tasks': '1', 'num_domains': '1', 'num_keywords': '8', 'keyword': ['peter poot', 'demmink', 'ben ottens', 'micha kat', 'controlled opposition', 'robert rubinstein', 'jan poot', 'boudine'], 'role': ['Owner']},
        {'gravatar': '0f3b91209286683221f0d56b9dbc7fcf', 'id': 'jortvlam', 'num_rewards': '2', 'num_tasks': '1', 'num_domains': '1', 'num_keywords': '2', 'keyword': ['Onderzoek', 'business'], 'role': ['QA thread answerer']},
        {'gravatar': '0f9bc6e79e1ccce34bfd8abc2705beab', 'id': 'goudvloot', 'num_rewards': '2', 'num_tasks': '1', 'num_domains': '1', 'num_keywords': '3', 'keyword': ['Brainstorm', 'sport', 'schaatsen'], 'role': ['QA thread answerer']},
        {'gravatar': '525d15b5d1093b18c78621dfe5358b8f', 'id': 'rich-art', 'num_rewards': '2', 'num_tasks': '1', 'num_domains': '1', 'num_keywords': '3', 'keyword': ['schaatsen', 'Brainstorm', 'sport'], 'role': ['QA thread answerer']},
        {'gravatar': '1b3899e0676e140f095e40d366ad29cd', 'id': 'AskBabs', 'num_rewards': '2', 'num_tasks': '1', 'num_domains': '1', 'num_keywords': '4', 'keyword': ['popmuziek', 'cultuur', 'klantbinding', 'Brainstorm'], 'role': ['QA thread answerer']},
        {'gravatar': '2893719db34d512a0bce33bf8359b2a2', 'id': 'ritzotencate', 'num_rewards': '2', 'num_tasks': '1', 'num_domains': '1', 'num_keywords': '4', 'keyword': ['popmuziek', 'cultuur', 'klantbinding', 'Brainstorm'], 'role': ['QA thread answerer']},
        {'gravatar': '6009bdc3189f5cd5beca5998eeb758fa', 'id': 'Thomasvanmaaren', 'num_rewards': '3', 'num_tasks': '2', 'num_domains': '1', 'num_keywords': '6', 'keyword': ['Brainstorm', 'sport', 'erfgoed', 'archieven', 'schaatsen', 'musea'], 'role': ['QA thread answerer']},
        {'gravatar': '7099901b6efae911f6e6a3c5df7ae1cb', 'id': 'edztra', 'num_rewards': '7', 'num_tasks': '3', 'num_domains': '1', 'num_keywords': '9', 'keyword': ['Brainstorm', 'popmuziek', 'cultuur', 'schaatsen', 'business', 'startups', 'klantbinding', 'sport', 'media'], 'role': ['QA thread answerer']},
        {'gravatar': '4b019b6c3be86ce1e1561e668e22ff3d', 'id': 'gerhin', 'num_rewards': '1', 'num_tasks': '1', 'num_domains': '1', 'num_keywords': '2', 'keyword': ['business', 'Brainstorm'], 'role': ['QA thread answerer']},
        {'gravatar': '9bdaeb2ef5e40ca5c661780c196778c2', 'id': 'Liekus', 'num_rewards': '1', 'num_tasks': '1', 'num_domains': '1', 'num_keywords': '2', 'keyword': ['business', 'Brainstorm'], 'role': ['QA thread answerer']},
        {'gravatar': 'fa67f2ce64a2b582047af6e36edbe628', 'id': 'michelpenterman', 'num_rewards': '1', 'num_tasks': '1', 'num_domains': '1', 'num_keywords': '2', 'keyword': ['Onderzoek', 'onderwijs'], 'role': ['QA thread answerer']},
        {'gravatar': '74874f98eb80095c1ab2909a1eccd21d', 'id': 'WillemJanDraper', 'num_rewards': '2', 'num_tasks': '1', 'num_domains': '1', 'num_keywords': '3', 'keyword': ['schaatsen', 'Brainstorm', 'sport'], 'role': ['QA thread answerer']},
        {'gravatar': 'b31871c816f9c512f96bea55bbfbe59e', 'id': 'jpschadde', 'num_rewards': '2', 'num_tasks': '1', 'num_domains': '1', 'num_keywords': '4', 'keyword': ['Brainstorm', 'klantbinding', 'popmuziek', 'cultuur'], 'role': ['QA thread answerer']},
        {'gravatar': '51a9cd59e1ddde5627bbf66fa3ad9235', 'id': 'rvwoens', 'num_rewards': '2', 'num_tasks': '1', 'num_domains': '1', 'num_keywords': '4', 'keyword': ['klantbinding', 'Brainstorm', 'popmuziek', 'cultuur'], 'role': ['QA thread answerer']},
        {'gravatar': '7aadd5e95b1bc57029700166cc07f4b4', 'id': 'SuzHen12', 'num_rewards': '2', 'num_tasks': '1', 'num_domains': '1', 'num_keywords': '4', 'keyword': ['popmuziek', 'cultuur', 'klantbinding', 'Brainstorm'], 'role': ['QA thread answerer']},
        {'gravatar': '98d8fa2f66ab953c3057d67165c07aaf', 'id': 'ecritures', 'num_rewards': '1', 'num_tasks': '1', 'num_domains': '1', 'num_keywords': '4', 'keyword': ['erfgoed', 'archieven', 'musea', 'Brainstorm'], 'role': ['QA thread answerer']},
        {'gravatar': '8d712abf33fcc3e206a506d276b1213a', 'id': 'boezeman', 'num_rewards': '4', 'num_tasks': '3', 'num_domains': '1', 'num_keywords': '11', 'keyword': ['Brainstorm', 'sport', 'cultuur', 'musea', 'muziek', 'schaatsen', 'community', 'klantbinding', 'erfgoed', 'archieven', 'tv'], 'role': ['QA thread answerer']},
        {'gravatar': '68a8bcfa8adf40f1ee9e16752f2adfb3', 'id': 'Duivestein', 'num_rewards': '2', 'num_tasks': '1', 'num_domains': '1', 'num_keywords': '2', 'keyword': ['business', 'Onderzoek'], 'role': ['QA thread answerer']}
    ], 'message': null};

//    var UPDATE_USER_ENDPOINT = 'https://test-api.mobbr.com/api_v1/user/update_user';


    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $httpBackend, mobbrSession, commonTest, mobbrMsg, $localStorage) {
        contr = $controller;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        common = commonTest;
        httpBackend = $httpBackend;

        state = {includes: function () {
            return true;
        }};

        $localStorage.token = undefined;
        // dummy login
        mobbrSession.setUser({email: 'jan@work.com', id: ['http://github.com/test']});

    }));

    function expectTagsOnArtikel() {
        httpBackend.expectGET('https://test-api.mobbr.com/api_v1/uris/info?url=http:%2F%2Fzaplog.nl%2Fzaplog%2Farticle%2Frechter_bp_schuldig_aan_grove_nalatigheid_bij_olieramp_2010').respond(200, {'result': {'script': {'url': 'http:\/\/zaplog.nl\/zaplog\/article\/rechter_bp_schuldig_aan_grove_nalatigheid_bij_olieramp_2010', 'title': 'Rechter: BP schuldig aan grove nalatigheid bij olieramp 2010  #zaplog', 'keywords': ['bp', 'deepwater horizon', 'golf van mexico', 'halliburton', 'milieuramp', 'olieramp', 'vervuiling', 'voedsel', 'water'], 'language': 'NL', 'image': 'https:\/\/images.weserv.nl?url=zaplog.nl%2Fimages%2Fsystem%2Fzaplogo.gif&h=150&w=150&t=square&trim=20', 'description': 'ZapLog - Nederlands beste nieuwssite, Dutch Bloggie winnaar 2008', 'participants': [
            {'id': 'http:\/\/zaplog.nl\/zaplog\/person\/patman', 'role': 'Owner', 'share': '1'},
            {'id': 'http:\/\/zaplog.nl\/zaplog\/person\/appie', 'role': 'Zaplog article author', 'share': '3'}
        ], 'type': 'donate', 'message': 'Consider making a donation to this item.', '.script-type': ['metadata', 'domain']}, 'statistics': []}, 'message': null});
    }

    function expectPeopleOnUrl() {
        httpBackend.expectGET('https://test-api.mobbr.com/api_v1/persons/invite?url=http:%2F%2Fzaplog.nl%2Fzaplog%2Farticle%2Frechter_bp_schuldig_aan_grove_nalatigheid_bij_olieramp_2010').respond(200, peopleResult);
    }

    function expectArtikel() {
//        expectTagsOnArtikel();
        expectPeopleOnUrl();
    }

    function createController(withHash) {
        if (withHash) {
            state.params = {urlHash: 'aHR0cDovL3phcGxvZy5ubC96YXBsb2cvYXJ0aWNsZS9yZWNodGVyX2JwX3NjaHVsZGlnX2Fhbl9ncm92ZV9uYWxhdGlnaGVpZF9iaWpfb2xpZXJhbXBfMjAxMA'};
        }
        contr('CrowdsController', {
            $scope: scope,
            $state: state
        });

        if (withHash) {
            expectArtikel();
        }

    }

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('Not retrieve anything when no url is given', function () {
        createController();

        expect(scope.url).toBe(undefined);
    });

    it('should retrieve tags and people when a url is known', function () {

        createController(true);

        //httpBackend.flush();

        expect(scope.persons.length).toBe(53);
        expect(scope.filteredTags.length).toBe(9);
    });

    it('should retrieve tags on statechangestart', function () {
        createController();

        scope.$broadcast('$stateChangeStart', {}, {urlHash: 'aHR0cDovL3phcGxvZy5ubC96YXBsb2cvYXJ0aWNsZS9yZWNodGVyX2JwX3NjaHVsZGlnX2Fhbl9ncm92ZV9uYWxhdGlnaGVpZF9iaWpfb2xpZXJhbXBfMjAxMA'});

        expectArtikel();

        httpBackend.flush();
        expect(scope.persons.result.length).toBe(53);
        expect(scope.filteredTags.length).toBe(9);

    });

    it('should remove a tag and reset', function(){
        createController(true);

        httpBackend.flush();

        scope.removeTag(scope.filteredTags[0]);
        expect(scope.filteredTags.length).toBe(8);

        httpBackend.expectGET('https://test-api.mobbr.com/api_v1/persons/task_candidates?keywords=deepwater+horizon&keywords=golf+van+mexico&keywords=halliburton&keywords=milieuramp&keywords=olieramp&keywords=vervuiling&keywords=voedsel&keywords=water').respond(200,peopleResult);
        httpBackend.flush();

        scope.resetTags();
        expect(scope.filteredTags.length).toBe(9);

        expectPeopleOnUrl();
        httpBackend.flush();
    });

    it('should add a tag', function(){
        createController(true);

        httpBackend.flush();

        scope.form.newTag = 'test';
        scope.addTag();

        httpBackend.expectGET('https://test-api.mobbr.com/api_v1/persons/task_candidates?keywords=bp&keywords=deepwater+horizon&keywords=golf+van+mexico&keywords=halliburton&keywords=milieuramp&keywords=olieramp&keywords=vervuiling&keywords=voedsel&keywords=water&keywords=test').respond(200,peopleResult);
        httpBackend.flush();
    });

    function selectPerson(person){
        person.selected = true;
        scope.addPerson(person);
    }

    it('should keep people selected when removing a tag', function(){
        createController(true);

        httpBackend.flush();

        expect(scope.selectedPersons.length).toBe(0);

        selectPerson(scope.persons.result[0]);
        selectPerson(scope.persons.result[1]);
        selectPerson(scope.persons.result[2]);

        expect(scope.selectedPersons.length).toBe(3);

        scope.removeTag(scope.filteredTags[0]);
        httpBackend.expectGET('https://test-api.mobbr.com/api_v1/persons/task_candidates?keywords=deepwater+horizon&keywords=golf+van+mexico&keywords=halliburton&keywords=milieuramp&keywords=olieramp&keywords=vervuiling&keywords=voedsel&keywords=water').respond(200,peopleResult);
        httpBackend.flush();


        expect(scope.selectedPersons.length).toBe(3);
        expect(scope.persons.result[0].selected).toBe(true);
        expect(scope.persons.result[1].selected).toBe(true);
        expect(scope.persons.result[2].selected).toBe(true);
        expect(scope.persons.result[3].selected).toBe(undefined);

    });

    it('should remove a selected person if it\'s selected for the second time', function(){
        createController(true);

        httpBackend.flush();

        expect(scope.selectedPersons.length).toBe(0);

        selectPerson(scope.persons.result[0]);
        expect(scope.selectedPersons.length).toBe(1);

        scope.persons.result[0].selected = false;
        scope.addPerson(scope.persons.result[0]);
        expect(scope.selectedPersons.length).toBe(0);
        expect(scope.persons.result[0].selected).toBe(false);
    });

    it('should deselected a selected person when removed', function(){
        createController(true);

        httpBackend.flush();

        selectPerson(scope.persons.result[0]);
        expect(scope.selectedPersons.length).toBe(1);

        scope.removePerson(scope.selectedPersons[0]);
        expect(scope.selectedPersons.length).toBe(0);
        expect(scope.persons.result[0].selected).toBe(false);

    });

    it('should filter on tags when not all original tags are available anymore', function(){
        createController(true);

        httpBackend.flush();
        expect(scope.filteredTags.length).toBe(9);
        scope.filteredTags.splice(0,1);
        var newArray = [];
        angular.forEach(scope.filteredTags, function(tag){
            newArray.push(tag);
        });
        scope.filteredTags = newArray;
        expect(scope.filteredTags.length).toBe(8);

        httpBackend.expectGET('https://test-api.mobbr.com/api_v1/persons/task_candidates?keywords=deepwater+horizon&keywords=golf+van+mexico&keywords=halliburton&keywords=milieuramp&keywords=olieramp&keywords=vervuiling&keywords=voedsel&keywords=water').respond(200,peopleResult);
        httpBackend.flush();

    });
});