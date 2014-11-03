/**
 * Created by andre on 25-07-14.
 */
'use strict';

/** global it, inject, describe, describe **/
describe('mobbr.directives - decorateAmount', function () {

    // load the controller's module
    beforeEach(module('mobbr.filters'));

    var scope,
        compile,
        iMobbrSession;


    var basicHTML = '<div><div id="amount" class="decorate-amount">{{value | mobbrcurrency}}</div><div>';


    // Initialize the controller and a mock scope
    beforeEach(inject(function ($compile, $rootScope, mobbrSession) {
        scope = $rootScope.$new();
        compile = $compile;

        // dummy login
        mobbrSession.setUser({email: 'jan@work.com', 'language_iso': 'NL_nl'});
        iMobbrSession = mobbrSession;
    }));

    function compileHtml(html) {

        var element = compile(html)(scope);
        scope.$digest();
        return element;
    }


//    it('should make a localeString presentation of the value according to the language_iso', function () {
//
//        scope.value = '10';
//
//        var element = compileHtml(basicHTML);
//
//        console.log(element.html());
//        expect(element.find('#amount').text()).toBe('10.0000');
//
//    });

    it('should not make a localeString presentation when the user is not loggedin', function () {

        iMobbrSession.unsetUser();

        scope.value = '10';

        var element = compileHtml(basicHTML);

        expect(element.find('#amount').text()).toBe('10.0000');

    });


});