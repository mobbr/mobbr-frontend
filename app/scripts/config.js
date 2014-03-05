//'use strict';
//
//var api_url = 'https://test-api.mobbr.com';

(function () {
  return angular.module("mobbr.config", [])
    .constant("apiUrl", "https://test-api.mobbr.com")
    .constant("environment", "test");
})();