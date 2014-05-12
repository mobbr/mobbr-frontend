'use strict';

angular.module('mobbr.controllers').controller('UserSettingsController', function ($http, $scope, $rootScope, $upload, apiUrl, MobbrUser, mobbrMsg) {

    $scope.new_email = $rootScope.$mobbrStorage.user.email;

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

    $scope.uploadIdentityProof = function (files) {
        angular.forEach(files, function (file) {
            if (file.size > 2048 * 1024) {
                mobbrMsg.add({ msg: 'File size cannot exceed 2MB' });
            } else {
                $upload.upload({
                    url: apiUrl + '/api_v1/user/upload_identity_proof',
                    file: file,
                    method: 'POST'
                });
            }
        });
    };

    $scope.submitSettings = function (form) {
        $scope.waitingsettings = MobbrUser.updateUser({ user: $rootScope.$mobbrStorage.user }, function () {
            form.$setPristine();
        });
    }

    $scope.submitEmail = function (form) {
        $scope.waitingemail = MobbrUser.updateEmail({ new_email: form.email.$modelValue }, function () {
            form.$setPristine();
        });
    }

    $scope.submitPassword = function (form) {
        $scope.waitingpassword = MobbrUser.updatePassword({ new_password: form.new_password.$modelValue }, function () {
            form.$setPristine();
        });
    }
});