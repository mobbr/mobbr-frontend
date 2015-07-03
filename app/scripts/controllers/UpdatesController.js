angular.module('mobbr.controllers').controller('UpdatesController', function ($scope, $q, $rootScope, notifications, balance, person, $state) {
    'use strict';

    var profileFields = [
        'firstname',
        'lastname',
        'birthday',
        'address',
        'country_of_residence',
        'nationality',
        'occupation',
        'income_range',
        'companyname',
        'vat_number',
        'currency_iso',
        'language_iso',
        'timezone'
    ];

    $scope.eventCategories = {
        payment_pledged: 'payment',
        payment_sent: 'payment',
        payment_received: 'payment',
        xpayment_created: 'payment',
        xpayment_received: 'payment',
        account_activation: 'security',
        pre_registration: 'security',
        password_update: 'security',
        login_key_generation: 'security',
        account_login: 'security',
        login: 'security',
        logout: 'security',
        auto_logout: 'security',
        email_address_confirmation: 'security',
        email_address_update: 'security',
        invoice_download: 'user',
        kyc_acceptance: 'user',
        script_mention: 'user',
        task_invitation: 'user',
        profile_update: 'user',
        kyc_failure: 'error',
        xpayment_failure: 'error',
        payment_revocation: 'error'
    };

    $scope.dashboard = balance.result;
    $scope.notifications = notifications;
    $scope.person = person;

    function parseIds() {
        $scope.parsedIds = [];
        angular.forEach($scope.oAuthProviders.result, function (providerObj) {
            angular.forEach($scope.$mobbrStorage.user.id, function (id) {
                providerObj.active = providerObj.active || (providerObj && id.indexOf(providerObj.host) > -1);
            });
            $scope.parsedIds.push(providerObj);
        });
    }

    $scope.$watch('$mobbrStorage.user.id', function (newValue) {
        if (newValue) {
            if ($scope.oAuthProviders && $scope.oAuthProviders.$resolved) {
                parseIds();
            } else {
                $q.when($scope.oAuthProviders).then(function () {
                    if ($scope.$mobbrStorage.user && $scope.$mobbrStorage.user.id) {
                        parseIds();
                    }
                });
            }
        }
    });

    var countFields = function (fields) {
        var count = 0;
        if ($scope.$mobbrStorage.user) {
            angular.forEach(fields, function (field) {
                if ($scope.$mobbrStorage.user[field]) {
                    count = count + 1;
                }
            });
        }

        return count;
    };

    $scope.countProfileCompleted = function () {

        var count = 1;

        if ($scope.$mobbrStorage.user) {
            count = countFields(profileFields);

            if ($scope.$mobbrStorage.user.mangopay_identity_proof === 'VALIDATION_ASKED' || $scope.$mobbrStorage.user.kyc_level === 'regular') {
                count++;
            }
        }

        return count / 14;
    };

    $scope.hasLink = function (notification) {
        switch (notification.type) {
            case 'payment_pledged':
            case 'payment_sent':
            case 'payment_received':
            case 'xpayment_created':
            case 'xpayment_received':
            case 'email_address_confirmation':
            case 'email_address_update':
            case 'invoice_download':
            case 'kyc_acceptance':
            case 'kyc_failure':
            case 'script_mention':
            case 'task_invitation':
            case 'profile_update':
            case 'xpayment_failure':
                return true;
                break;
            default:
                return false;
        }
    }

    $scope.notificationLink = function (notification) {
        if (notification.type.indexOf('xpayment') !== -1) {
            $state.go('x-payment', { id: notification.link });
        } else if (notification.type.indexOf('payment') !== -1) {
            $state.go('payment', { id: notification.link });
        } else {
            switch (notification.type) {
                case 'email_address_confirmation':
                case 'email_address_update':
                    $state.go('settings.account');
                    break;
                case 'invoice_download':
                    $state.go('payments.payments');
                    break;
                case 'kyc_acceptance':
                case 'kyc_failure':
                    $state.go('settings.proof');
                    break;
                case 'script_mention':
                case 'task_invitation':
                    $state.go('task', { task: $window.btoa(notification.link) });
                    break;
                case 'profile_update':
                    $state.go('person', { username: $scope.$mobbrStorage.user.username });
                    break;
                case 'xpayment_failure':
                    $state.go('wallet.xpayments');
                    break;
            }
        }
    }

    $scope.updates = { open: true };

});
