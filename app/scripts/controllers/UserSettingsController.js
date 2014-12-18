'use strict';

angular.module('mobbr.controllers').controller('UserSettingsController', function ($scope, $state, $rootScope, $upload, apiUrl, MobbrUser, mobbrMsg, mobbrSession) {


    function countFields(fields) {

        var count = 0;

        if ($scope.$mobbrStorage.user) {
            angular.forEach(fields, function (field) {
                if ($scope.$mobbrStorage.user[field]) {
                    count = count + 1;
                }
            });
        }

        return count;
    }

    $scope.birthdate = new Date($rootScope.$mobbrStorage.user.birthday);
    $scope.passwordHolder = {};
    $scope.new_email = $rootScope.$mobbrStorage.user.email;

    $scope.settingsLabels = {
        hide_my_incoming_payments: 'Hide my incoming payments',
        hide_my_items: 'Hide my items',
        hide_my_profile: 'Hide my profile / anonymize me',
        hide_my_outgoing_payments: 'Hide my outgoing payments',
        hide_my_email_from_donators: 'Hide my email from donators',
        hide_my_email_from_public: 'Hide my email from public users',
        send_json_mention_notification: 'Send JSON mention notification',
        send_monthly_reports: 'Send monthly reports',
        send_newsletter: 'Send me newsletters to keep me informed',
        send_payment_expired_notification: 'Send payment expire notifications',
        send_payment_received_notification: 'Send payment recieved notifications',
        send_invoice_download_notification: 'Send invoice download notifications',
        send_task_invitation_notification: 'Send task invitation notifications'
    };

    $scope.setBirthdate = function (value) {
        $rootScope.$mobbrStorage.user.birthday = value;
    };

    $scope.uploadIdentityProof = function (files) {
        MobbrUser.updateUser({ user: $rootScope.$mobbrStorage.user }, function () {
            angular.forEach(files, function (file) {
                if (file.size > 2048 * 1024) {
                    mobbrMsg.add({ msg: 'File size cannot exceed 2MB' });
                } else {
                    $scope.uploading = true;
                    $upload.upload({
                        url: apiUrl + '/api_v1/user/upload_identity_proof',
                        file: file,
                        method: 'POST'
                    }).progress(
                        function (e) {
                            $scope.progress = parseInt(100 * e.loaded / e.total);
                        }
                    ).success(
                        function (data) {
                            mobbrSession.setUser(data.result);
                            $scope.uploading = false;
                            $scope.progress = 0;
                        }
                    ).error(
                        function () {
                            $scope.uploading = false;
                            $scope.progress = 0;
                        }
                    );
                }
            });
        });
    };

    $scope.submitSettings = function (form) {
        $scope.waitingsettings = MobbrUser.updateUser({ user: $rootScope.$mobbrStorage.user }, function () {
            form && form.$setPristine();
            $state.go('settings');
        });
    };

    $scope.submitEmail = function (form) {
        $scope.waitingemail = MobbrUser.updateEmail({ new_email: form.email.$modelValue }, function () {
            form && form.$setPristine();
            $state.go('settings');
        });
    };

    $scope.submitPassword = function (form) {
        if (form && form.$valid) {
            $scope.waitingpassword = MobbrUser.updatePassword({ new_password: form.new_password.$modelValue }, function () {
                $scope.passwordHolder = {};
                form && form.$setPristine();
                $state.go('settings');
            });
        }
    };

    $scope.countIdentityCompleted = function () {
        return countFields([ 'firstname', 'lastname', 'birthday', 'address', 'country_of_residence', 'nationality' ]);
    };

    $scope.countProofCompleted = function () {

        var count = countFields([ 'occupation', 'income_range' ]);

        if ($scope.$mobbrStorage.user.mangopay_identity_proof === 'VALIDATION_ASKED' || $scope.$mobbrStorage.user.kyc_level === 'regular') {
            count++;
        }

        return count;
    };

    $scope.countInvoicingCompleted = function () {
        return countFields([ 'companyname', 'vat_number' ]);
    };

    $scope.countDisplayCompleted = function () {
        return countFields([ 'currency_iso', 'language_iso', 'timezone' ]);
    };
});