
'use strict';

angular.module('mobbr.widgets').service('TopUrlService', function ($http) {

  var url = 'https://api.mobbr.com/api/global/top_urls';

    console.log('test');

  this.urls = function() {
    return $http.get(url).then(function(response) {
      return response.data.result;
    });
  }
});