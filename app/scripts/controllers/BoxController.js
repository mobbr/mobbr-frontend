/* global purl */
angular.module('mobbr.controllers').controller('BoxController', function ($scope, $rootScope, $state, $window, mobbrSession, MobbrKeywords) {
    'use strict';

    function refreshTags() {
        $scope.tagsChanged = $scope.tags && $scope.tags.result && angular.equals($scope.tags.result, $scope.filteredTags.length);
        $scope.$broadcast('update-tags');
    }

    function queryPeople(url) {

        var api, params;

        if ($state.includes('box.crowds') && url && url !== $scope.activeQuery) {
            api = MobbrKeywords.uri;
            params = {
                language: $scope.filter_language,
                url: url
            };
        } else if (mobbrSession.isAuthorized()) {
            api = MobbrKeywords.person;
            params = {
                language: $scope.filter_language,
                username: $rootScope.$mobbrStorage.user.username
            };
        } else {
            api = MobbrKeywords.get;
            params = {
                language: $scope.filter_language
            };
        }

        $scope.tags = api(params);
        $scope.tags.$promise.then(function () {
            $scope.filteredTags = [];
            angular.forEach($scope.tags.result, function (keyword) {
                $scope.filteredTags.push(keyword.keyword);
            });
            refreshTags();
        });
    }

    $scope.addTag = function () {
        if ($scope.form.newTag && $scope.form.newTag.length > 0) {
            $scope.filteredTags.push($scope.form.newTag);
            $scope.form.newTag = undefined;
        }
    };

    $scope.topTags = function () {
        MobbrKeywords.get({ limit: 10 }, function (response) {
            if (response.result) {
                angular.forEach(response.result, function (keyword) {
                    $scope.filteredTags.push(keyword.keyword);
                });
            }
        })
    };

    $scope.removeTag = function (tag) {
        var keywords = $scope.filteredTags;
        keywords.splice(keywords.indexOf(tag), 1);
    };

    $scope.$on('$stateChangeStart', function (event, toState, toParams) {

        if (toState.name === 'box.crowds' || toState.name === 'box.tasks') {
            queryPeople(toParams.task && $window.atob(toParams.task) || undefined);
        }

        if (toState.name.indexOf('box.crowds.task') === 0) {
            queryPeople(toParams.task && $window.atob(toParams.task) || undefined);
            //console.log('zettum');
            //$scope.$emit('set-query');
            //$scope.$emit('set-active-query');
        }
    });

    /*$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        $scope.tag = toParams.tag;
        if ($state.includes('box.tasks')) {
            queryFilter();
        }
    });*/

    /*$scope.$on('set-tags', function (event, method, params) {
        $scope.tags = MobbrKeywords[method](params);
        $scope.tags.$promise.then($scope.resetTags);
    });*/

    $scope.$on('set-query', function (event, query) {
        $scope.query = query;
    });

    $scope.$on('set-active-query', function (event, activeQuery) {
        $scope.activeQuery = activeQuery;
    });

    $scope.$on('filter-update', refreshTags);

    $scope.$watch('filteredTags', function (newValue, oldValue) {
        if (newValue !== undefined) {
            refreshTags();
        }
    }, true);

    queryPeople($state.params.task && $window.atob($state.params.task) || undefined);
});