'use strict';

angular.module('mobbr.controllers').controller('UserSettingsController', function ($scope, userSession, User, Msg) {

    $scope.user = userSession.user;
    $scope.new_email = $scope.user.email;

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

    $scope.submitEmail = function (form) {
        User.updateEmail({ new_email: form.email.$modelValue }, function (response) {
            Msg.setResponseMessage('info', 'New e-mail address saved', response);
        }, function (response) {
            Msg.setResponseMessage('error', 'Could not save e-mail address', response);
        });
    }

    $scope.submitPassword = function (form) {
        User.updatePassword({ new_password: form.new_password.$modelValue, old_password: form.current_password.$modelValue }, function (response) {
            Msg.setResponseMessage('info', 'New password saved', response);
        }, function (response) {
            Msg.setResponseMessage('error', 'Could not save password', response);
        });
    }
});