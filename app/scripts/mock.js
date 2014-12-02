angular.module('e2e-mocks', [ 'ngMockE2E' ])
    .run(function ($injector, $rootScope) {

        var $httpBackend = $injector.get('$httpBackend');

        $httpBackend.whenGET(/views\/.*/).passThrough();
        console.log('we are mocky');
    }
);

angular.module('mobbr').requires.push('e2e-mocks');