'use strict';

angular.module('mobbr.controllers').controller('UserSettingsController', function ($http, $scope, $rootScope, userSession, $upload, apiUrl, MobbrUser, Msg) {

    $scope.userSession = userSession;
    $scope.new_email = $scope.userSession.user.email;
    $scope.waitingsettings = false;
    $scope.waitingemail = false;
    $scope.waitingpassword = false;

    $scope.uploadIdentityProof = function (files) {
        angular.forEach(files, function (file) {
            $upload.upload({
                url: apiUrl + '/api/user/upload_identity_proof',
                file: file,
                method: 'POST'
            });
        });
    };

    $scope.submitSettings = function () {
        $scope.waitingsettings = true;
        MobbrUser.updateUser({
            user: $scope.userSession.user
        }, function (response) {
            userSession.update(response.result);
            $scope.waitingsettings = false;
        }, function () {
            $scope.waitingsettings = false;
        });
    }

    $scope.submitEmail = function (form) {
        $scope.waitingemail = true;
        MobbrUser.updateEmail({
            new_email: form.email.$modelValue
        },
        function () {
            $scope.waitingemail = false;
        },
        function () {
            $scope.waitingemail = false;
        });
    }

    $scope.submitPassword = function (form) {
        $scope.waitingpassword = true;
        MobbrUser.updatePassword({
            new_password: form.new_password.$modelValue
        },
        function () {
            $scope.waitingpassword = false;
        },
        function () {
            $scope.waitingpassword = false;
        });
    }

    $scope.settingsLabels = {
        hide_my_incoming_payments: 'Hide my incoming payments',
        hide_my_items: 'Hide my items',
        hide_my_outgoing_payments: 'Hide my outgoing payments',
        send_json_mention_notification: 'Send JSON mention notification',
        send_monthly_reports: 'Send monthly reports',
        send_newsletter: 'Send me newsletters to keep me informed',
        send_payment_expired_notification: 'Send payment expire notifications',
        send_payment_received_notification: 'Send payment recieved notifications'
    };
});