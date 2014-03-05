(function () {
  return angular.module("mobbr.config", [])
    .constant("apiUrl", "https://test-api.mobbr.com")
    .constant("environment", "test");
})();