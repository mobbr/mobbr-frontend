'use strict';


angular.module('mobbr.controllers').controller('ActivateController', function ($scope, User, userSession, Msg, $location, $routeParams) {


    User.linkLogin({'login_token':$routeParams.hash},function (response) {
            if (response.result !== null && response.result != undefined) {

                userSession.doLogin(response.result);

                Msg.setResponseMessage('info', 'Activated your account', response);

                $location.path('/dashboard');
            } else {
                Msg.setResponseMessage('info', 'Could not log you in', response);
            }
        },
        function (response) {
            Msg.setResponseMessage('error', 'Could not activate your account', response);
        });




});
