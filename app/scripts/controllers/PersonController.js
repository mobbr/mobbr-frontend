angular.module('mobbr.controllers').controller('PersonController', function ($scope, $stateParams, MobbrKeywords, MobbrPerson, MobbrGravatar, MobbrOneName) {
    'use strict';

    $scope.username = $stateParams.username;

    $scope.keywords = MobbrKeywords.person({username: $scope.username});

    function getFromLastPart(url) {
        var lastPart = url.substring(url.lastIndexOf('/') + 1);
        return lastPart;
    }

    function findPartInArray(array, part) {
        var foundItem;
        angular.forEach(array, function (item) {
            if (item.indexOf(part) > -1) {
                foundItem = item;
            }
        });
        return foundItem;
    }

    function gravatarPromise(promise){
        promise.then(function(response){
            if(response.entry && response.entry.length > 0){
                $scope.remoteProfile = response = response.entry[0];

            }
        });
    }

    $scope.personPromise = MobbrPerson.info({username: $scope.username});
    function findRemoteProfile() {
        var id = findPartInArray($scope.person.user.id, 'gravatar');
        if (id) {
            gravatarPromise(MobbrGravatar.get({gravatarHash: getFromLastPart(id)}).$promise);
        } else {
            id = findPartInArray($scope.person.user.id, 'onename');
            if (id) {
                MobbrOneName.get({onenameId: getFromLastPart(id)}).$promise.then(function (response) {
                    $scope.remoteProfile = response;
                });
            } else if ($scope.person.user.gravatar) {
                gravatarPromise(MobbrGravatar.get({gravatarHash: $scope.person.user.gravatar}).$promise);
            }
        }
    }

    $scope.personPromise.$promise.then(function (response) {
        $scope.person = response.result;

        findRemoteProfile();

        if($scope.person && $scope.person.user && $scope.person.user.id){
            var enrichedIds = [];
            angular.forEach($scope.person.user.id, function(id){
                var enrichedId = {};
                enrichedId.id = id;
                angular.forEach($scope.idProviders, function(provider){
                    if(id.indexOf(provider.provider) > -1){
                        enrichedId.host = provider.host;
                        enrichedId.facicon = provider.favicon;
                        enrichedId.provider = provider.provider;
                    }
                });
                if(enrichedId.provider){
                    enrichedIds.push(enrichedId);
                }
            });
            if(enrichedIds.length > 0){
                $scope.person.user.ids = enrichedIds;
            }
        }
    });



});
