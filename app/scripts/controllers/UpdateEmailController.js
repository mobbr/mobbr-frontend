'use strict';


angular.module('mobbr.controllers').controller('UpdateEmailController', function ($scope, User, userSession, Msg, $location, $routeParams) {


    User.confirmEmail({'update_token':$routeParams.hash},function (response) {
            Msg.setResponseMessage('info', 'Updated your email address', response);
            userSession.clearLogin();
            $location.path('/settings');
        },
        function (response) {
            Msg.setResponseMessage('error', 'Could not update your email address', response);
        });
});