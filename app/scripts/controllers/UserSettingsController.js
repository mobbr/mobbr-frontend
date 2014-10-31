'use strict';

angular.module('mobbr.controllers').controller('UserSettingsController', function ($scope, $state, $rootScope, $upload, $http, $window, $interval, apiUrl, uiUrl, MobbrUser, mobbrMsg, mobbrSession) {

    var popup_url,
        oauth_popup;

    $scope.formHolder = {addPaymentIdForm: undefined};
    $scope.passwordHolder = {};
    $scope.new_email = $rootScope.$mobbrStorage.user.email;
    $scope.birthdate = new Date($rootScope.$mobbrStorage.user.birthday);

    $scope.settingsLabels = {
        hide_my_incoming_payments: 'Hide my incoming payments',
        hide_my_items: 'Hide my items',
        hide_my_outgoing_payments: 'Hide my outgoing payments',
        'hide_my_email_from_donators': 'Hide my email from donators',
        'hide_my_email_from_public': 'Hide my email from public users',
        send_json_mention_notification: 'Send JSON mention notification',
        send_monthly_reports: 'Send monthly reports',
        send_newsletter: 'Send me newsletters to keep me informed',
        send_payment_expired_notification: 'Send payment expire notifications',
        send_payment_received_notification: 'Send payment recieved notifications',
        send_invoice_download_notification: 'Send invoice download notifications',
        send_task_invitation_notification: 'Send task invitation notifications'
    };


    $scope.$watch('$mobbrStorage.user.thumbnail', function (newValue) {
        if (newValue) {
            $scope.thumbnailFound = false;
            $http({method: 'GET', url: newValue}).
                success(function (data, status) {
                    if (status === 200 || status === 201) {
                        $scope.thumbnailFound = true;
                    }

                }).error(function () {

                    $scope.thumbnailFound = false;
                });
        }

    });

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


    $scope.removePaymentID = function (paymentId) {
        MobbrUser.deleteUserId({id: paymentId}, function (response) {
            mobbrSession.setUser(response.data.result);
            matchProviders();
        });
    };


    $scope.addPaymentIdHolder = {idType: undefined, oAuthProvider: undefined, email: undefined};

    function clearPaymentIdHolder() {
        $scope.addPaymentIdHolder = {};
        $scope.formHolder.addPaymentIdForm.$setPristine();
    }

    $scope.addExtraEmail = function () {
        if ($scope.formHolder.addPaymentIdForm.$valid) {
            $scope.waitingAddId = MobbrUser.addEmailId({new_email: $scope.addPaymentIdHolder.email}, clearPaymentIdHolder);
        }
    };

    $scope.toggleDatePopup = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.datePopup.open = !$scope.datePopup.open;
    };


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

    var identityFields = ['firstname', 'lastname', 'birthday', 'address', 'country_of_residence', 'nationality'];
    $scope.countIdentityCompleted = function () {
        return countFields(identityFields);
    };

    var proofFields = ['occupation', 'income_range'];
    $scope.countProofCompleted = function () {

        var count = countFields(proofFields);

        if ($scope.$mobbrStorage.user.mangopay_identity_proof === 'VALIDATION_ASKED' || $scope.$mobbrStorage.user.kyc_level === 'regular') {
            count++;
        }

        return count;
    };

    var invoicingFields = ['companyname', 'vat_number'];
    $scope.countInvoicingCompleted = function () {
        return countFields(invoicingFields);
    };

    var countDisplayCompleted = ['currency_iso', 'language_iso', 'timezone'];
    $scope.countDisplayCompleted = function () {
        return countFields(countDisplayCompleted);
    };

    $scope.updateBirthdate = function (newBirthDate) {
        $scope.$mobbrStorage.user.birthday = newBirthDate;
    }

    var matchProviders = function () {
        function addIdIfFound(provider) {
            angular.forEach($scope.$mobbrStorage.user.id, function (id) {
                if (id.indexOf(provider.host) > -1) {
                    provider.id = id;
                    provider.idConfirmed = true;
                }
            });
        }

        if ($scope.oAuthProviders && $scope.oAuthProviders.result) {

            $scope.oAuthWithIdProviders = [];
            $scope.stackExchangeProviders = [];

            angular.forEach($scope.oAuthProviders.result, function (provider) {

                var copy = angular.copy(provider),
                    stack = copy.provider && copy.provider.indexOf('stackexchange.com') !== -1;

                addIdIfFound(copy);

                if (copy.id) {
                    $scope.oAuthWithIdProviders.unshift(copy);
                } else {
                    stack ? $scope.stackExchangeProviders.push(copy) : $scope.oAuthWithIdProviders.push(copy);
                }
            });
        }

        if ($scope.idProviders && $scope.idProviders.length > 0) {
            $scope.idWithIdProviders = [];
            angular.forEach($scope.idProviders, function (provider) {
                var copy = angular.copy(provider);
                addIdIfFound(copy);
                if(copy.id){
                    $scope.idWithIdProviders.unshift(copy);
                }else{
                    $scope.idWithIdProviders.push(copy);
                }
            });
        }

        $scope.otherIdProviders = [];

        angular.forEach($scope.$mobbrStorage.user.id, function (id) {

            var found = false;

            angular.forEach($scope.oAuthWithIdProviders, function (item) {
                if (item.id && id === item.id) {
                    found = true;
                }
            });

            angular.forEach($scope.idWithIdProviders, function (item) {
                if (item.id && id === item.id) {
                    found = true;
                }
            });

            if (!found && id.indexOf('mobbr.com') === -1 && id.indexOf('mailto:') === -1) {
                $scope.otherIdProviders.push(id);
            }
        });
    };

    $scope.$on('$stateChangeSuccess', matchProviders);

    $scope.$watch('idProviders', function (newValue, oldValue) {
        if (newValue && (!oldValue || oldValue.length === 0) && !$scope.idWithIdProviders) {
            matchProviders();
        }
    });

    $scope.$watch('oAuthProviders.result', function (newValue, oldValue) {
        if (newValue && !oldValue && !$scope.oAuthWithIdProviders) {
            matchProviders();
        }
    });

    $scope.addIdentityProvider = function (provider) {
        MobbrUser.addPublicId({provider: provider.provider, identity: provider.id}).$promise.then(function (response) {
            mobbrSession.setUser(response.result);
            matchProviders();
        });
    };

    function popupMessage(e) {
        if (e.data === 'oauth-popup') {

            var popup_location = oauth_popup.location.href;

            oauth_popup.close();
            $scope.waitingAddId = MobbrUser.confirmOauthId({
                    redirected_url: popup_location,
                    provider: $scope.provider
                },
                matchProviders,
                function () {
                    $scope.provider = null;
                }
            );
            $window.removeEventListener('message', popupMessage);
        }
    }

    $scope.addOAuthProvider = function (provider) {
        if (provider) {
            popup_url = $window.location.origin + '/popup.html';
            oauth_popup = $window.open('about:blank', 'oauth-popup');
            $scope.provider = provider.provider;
            $scope.waitingAddId = MobbrUser.oAuthUrl({
                provider: $scope.provider,
                redirect_url: popup_url
            }, function (response) {
                oauth_popup.location.href = response.result;
                $window.addEventListener('message', popupMessage, false);
            }, function () {
                oauth_popup.close();
                $scope.provider = null;
            });
        }
    };

    $scope.$watch('$mobbrStorage.user.id', function () {
        $scope.emailAddresses = [];
        angular.forEach($scope.$mobbrStorage.user.id, function (id) {
            if (id && (id.indexOf('http') > -1) && (id.indexOf('mobbr.com') > -1)) {

                $scope.mobbrId = id;
            }
            else if (id && id.indexOf('mailto') > -1) {
                $scope.emailAddresses.push(id);
            }
        });
    });
});