/** global it, inject, describe, describe **/
describe('mobbr.directives mobbrSmartUrlBox', function () {
    'use strict';


    // load the controller's module
    beforeEach(module('mobbr.directives'));

    var scope,
        compile,
        location,
        rootScope;


    var basicHTML = '<div>' +
        '<mobbr-smart-url-box></mobbr-smart-url-box>' +
        '</div>';

    var crowsTypeHTML = '<div>' +
        '<mobbr-smart-url-box url-type="CROWDS"></mobbr-smart-url-box>' +
        '</div>';

    // load the templates
    beforeEach(module('views/directives/smarturlbox.html'));

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($compile, $rootScope, $location) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        compile = $compile;
        location = $location;

        spyOn(location, 'path');
    }));


    function compileHtml(html) {
        rootScope.$apply();
        var element = compile(html)(scope);
        scope.$digest();
        return element;
    }


    it('should initially go to url type when no type is given ', function () {
        var element = compileHtml(basicHTML).find('.smarturlbox');
        expect(element.hasClass('url')).toBeTruthy();
    });

    it('should initially go to crows type when crows type is given ', function () {
        var element = compileHtml(crowsTypeHTML).find('.smarturlbox');
        expect(element.hasClass('url')).toBeFalsy();

        expect(element.hasClass('crowds')).toBeTruthy();
    });

    it('should switch url type by opening the list and clicking crowds', function (){
        var element = compileHtml(basicHTML).find('.smarturlbox');
        expect(element.hasClass('url')).toBeTruthy();

        expect(element.find('ul.ng-hide').length).toBe(1);
        element.find('.showUrlTypes').click();
        expect(element.find('ul:not(.ng-hide)').length).toBe(1);
        element.find('li:eq(1)').click();

        expect(element.hasClass('url')).toBeFalsy();
        expect(element.hasClass('crowds')).toBeTruthy();
    });

    it('should go to the task url', function(){
        var element = compileHtml(basicHTML).find('.smarturlbox');
        element.find('input[type=text]').val('nu.nl');
        element.find('input[type=text]').trigger('change');
        element.find('input[type=submit]').click();

        expect(location.path).toHaveBeenCalledWith('/task/bnUubmw=');
    });

    it('should go to the crowds url', function(){
        var element = compileHtml(basicHTML).find('.smarturlbox');

        element.find('input[type=text]').val('test');
        element.find('input[type=text]').trigger('change');
        element.find('.showUrlTypes').click();

        element.find('li:eq(1)').click();
        element.find('input[type=submit]').click();

        expect(location.path).toHaveBeenCalledWith('/crowds/test');
    });

    it('should go to the tasks url', function(){
        var element = compileHtml(basicHTML).find('.smarturlbox');

        element.find('input[type=text]').val('test');
        element.find('input[type=text]').trigger('change');
        element.find('.showUrlTypes').click();

        element.find('li:eq(2)').click();
        element.find('input[type=submit]').click();

        expect(location.path).toHaveBeenCalledWith('/tasks/dGVzdA==');
    });


});