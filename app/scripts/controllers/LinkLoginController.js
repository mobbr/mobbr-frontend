'use strict';


angular.module('mobbr.controllers').controller('LinkLoginController', function ($scope, $route, User, userSession, Msg, $location, $routeParams) {



    User.linkLogin({'login_token': $routeParams.hash},
        function (response) {
            if (response.result != null) {

                userSession.doLogin(response.result);

                $location.path('/dashboard');

                Msg.setResponseMessage('info', 'Logged you in, please change your password now', response);

            } else {
                Msg.setResponseMessage('info', 'Could not log you in', response);
            }
        },
        function (response) {
            Msg.setResponseMessage('error', 'Could not log you in', response);
        });

});