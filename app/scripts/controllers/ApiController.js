'use strict';


angular.module('mobbr.controllers').controller('apiController', function ($rootScope, MobbrApi) {

    if ($rootScope['apiCalls'] == null) {
        $rootScope.apiCalls = [];

        MobbrApi.query(
            function (response) {
                if (response != null) {
                    $rootScope.apiCalls = response.result;
                }
            },
            function (repsonse) {
            });
    }

});
