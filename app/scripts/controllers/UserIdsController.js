'use strict';

angular.module('mobbr.controllers').controller('UserIdsController', function ($scope, $state, $window, MobbrUser, mobbrSession) {

    var popup_url,
        oauth_popup;

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

    function addIdIfFound(provider) {
        angular.forEach($scope.$mobbrStorage.user.id, function (id) {
            if (id.indexOf(provider.host) > -1) {
                provider.id = id;
                provider.idConfirmed = true;
            }
        });
    }

    function matchProviders() {

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

    $scope.removePaymentID = function (paymentId) {
        MobbrUser.deleteUserId({id: paymentId}, function (response) {
            mobbrSession.setUser(response.data.result);
            matchProviders();
        });
    };

    $scope.addIdentityProvider = function (provider) {
        MobbrUser.addPublicId({provider: provider.provider, identity: provider.id}).$promise.then(function (response) {
            mobbrSession.setUser(response.result);
            matchProviders();
        });
    };

    $scope.addExtraEmail = function () {
        if ($scope.formHolder.addPaymentIdForm.$valid) {
            $scope.waitingAddId = MobbrUser.addEmailId({
                new_email: $scope.addPaymentIdHolder.email
            }, function () {
                $scope.addPaymentIdHolder = {};
                $scope.formHolder.addPaymentIdForm.$setPristine();
            });
        }
    };

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

    $scope.$on('$stateChangeSuccess', matchProviders);

    $scope.addPaymentIdHolder = { idType: undefined, oAuthProvider: undefined, email: undefined };
    $scope.formHolder = { addPaymentIdForm: undefined };
});