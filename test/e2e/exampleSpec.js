'use strict';

describe('Mobbr e2e example', function () {


    var ptor;

    beforeEach(function () {
        browser.get('http://mobbr.dev:9001/#/');
        ptor = protractor.getInstance();
        ptor.waitForAngular();
    });

    it('should display a header text', function () {
        expect(element(by.css('h1')).getInnerHtml()).toEqual('Turn your website into a crowdsourcing business');
    });



});


