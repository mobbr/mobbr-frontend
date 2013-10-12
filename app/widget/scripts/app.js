'use strict';

angular.module('mobbr.widgets', []);

angular.module('embeddableWidgetApp', ['mobbr.widgets'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {templateUrl: 'views/home.tpl.html'})
      .when('/topurls', {templateUrl: 'widgets/topurls/topurls.tpl.html', controller: 'TopUrlController'})
      .otherwise({
        redirectTo: '/'
      });
  });
