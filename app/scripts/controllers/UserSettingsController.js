'use strict';

angular.module('mobbr.controllers').controller('UserSettingsController', function ($scope, userSession, User, Msg) {

    $scope.user = userSession.user;
    $scope.new_email = $scope.user.email;

    $scope.waitingsettings = false;
    $scope.waitingemail = false;
    $scope.waitingpassword = false;
    $scope.submitSettings = function () {
        $scope.waitingsettings = true;
        User.save({user: $scope.user}, function (response) {
            $scope.waitingsettings = false;
            if (response.result === true) {
                Msg.setResponseMessage('info', 'Settings saved', response);
            } else {
                Msg.setResponseMessage('error', 'Could not save settings', response);
            }
        }, function (response) {
            $scope.waitingsettings = false;
            Msg.setResponseMessage('error', 'Could not save settings', response);
        });
    }

    $scope.submitEmail = function (form) {
        $scope.waitingemail = true;
        User.updateEmail({ new_email: form.email.$modelValue }, function (response) {
            $scope.waitingemail = false;
            Msg.setResponseMessage('info', 'New email address set', response);
        }, function (response) {
            $scope.waitingemail = false;
            Msg.setResponseMessage('error', 'Could not change email address', response);
        });
    }

    $scope.submitPassword = function (form) {
        $scope.waitingpassword = true;
        User.updatePassword({ new_password: form.new_password.$modelValue }, function (response) {
            $scope.waitingpassword = false;
            Msg.setResponseMessage('info', 'New password saved', response);
        }, function (response) {
            $scope.waitingpassword = false;
            Msg.setResponseMessage('error', 'Could not change password', response);
        });
    }
});