angular.module('mobbr.controllers').controller('PersonController', function ($scope, $stateParams, $state, MobbrKeywords, MobbrPerson, MobbrGravatar, MobbrOneName) {
    'use strict';

    function reset() {
        $scope.$emit('set-active-query');
        $scope.personPromise = null;
        $scope.keywords = null;
        $scope.username = null;
        $scope.person = null;
    }

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

    function setProfile() {
        if ($state.current.name === 'box.person.profile') {
            $scope.username = $state.params.username;
            $scope.$emit('set-query', $scope.username);

            $scope.keywords = MobbrKeywords.person({username: $scope.username});
            $scope.personPromise = MobbrPerson.info({username: $scope.username}, function (response) {
                $scope.person = response.result;

                $scope.$emit('set-active-query', $scope.username);

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
            }, function () {
                reset();
            });
        } else {
            reset();
            $scope.$emit('set-query');
        }
    }
    $scope.$on('$stateChangeSuccess', setProfile);

    //setProfile();
});
