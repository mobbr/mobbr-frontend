'use strict';


angular.module('mobbr.controllers').controller('apiController', function ($rootScope, Api) {

    if ($rootScope['apiCalls'] == null) {
        $rootScope.apiCalls = [];

        Api.list(
            function (response) {
                if (response != null) {
                    $rootScope.apiCalls = response.result;
                }
            },
            function (repsonse) {
            });
    }

});
