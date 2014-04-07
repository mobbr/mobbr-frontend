'use strict';

angular.module('mobbr.controllers').controller('LinkLoginController', function ($scope, $route, $routeParams, MobbrUser, userSession, Msg) {

    MobbrUser.linkLogin({
            login_token: $routeParams.hash
        },
        function (response) {
            if (response.result != null) {
                userSession.doLogin(response.result);
                Msg.setResponseMessage('info', 'Logged you in, please change your password now', response);
            } else {
                Msg.setResponseMessage('info', 'Could not log you in', response);
            }
        },
        function (response) {
            Msg.setResponseMessage('error', 'Could not log you in', response);
        }
    );
});