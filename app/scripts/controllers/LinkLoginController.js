'use strict';


angular.module('mobbr.controllers').controller('LinkLoginController', function ($scope, $route, User, userSession, Msg, $location, $routeParams) {



    User.linkLogin({'session_token': $routeParams.hash},
        function (response) {
            if (response.result != null) {

                userSession.doLogin(response.result);

                $location.path('/dashboard');

                Msg.setResponseMessage('info', 'Logged in, please change your password', response);

            } else {
                Msg.setResponseMessage('info', 'Could not login', response);
            }
        },
        function (response) {
            Msg.setResponseMessage('error', 'could not log you in', response);
        });

});