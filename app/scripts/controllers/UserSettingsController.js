'use strict';

angular.module('mobbr.controllers').controller('UserSettingsController', function ($scope, userSession, User, Msg) {

    $scope.user = userSession.user;

    $scope.submitSettings = function () {
        User.save({user: $scope.user}, function (response) {
            if (response.result === true) {
                Msg.setResponseMessage('info', 'Settings saved', response);
            } else {
                Msg.setResponseMessage('info', 'Settings', response);
            }
        }, function (response) {
            Msg.setResponseMessage('error', 'Could not save settings', response);
        });
    }
});