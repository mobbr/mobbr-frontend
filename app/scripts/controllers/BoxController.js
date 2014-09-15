/* global purl */
angular.module('mobbr.controllers').controller('BoxController', function ($scope, $rootScope, $state, $window, mobbrSession, MobbrKeywords) {
    'use strict';

    function doQuery(url) {

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
        });
    }

    function refresh() {
        $scope.tagsChanged = $scope.tags && $scope.tags.result && angular.equals($scope.tags.result, $scope.filteredTags.length);
        $scope.$broadcast('update-tags');
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
            doQuery(toParams.task && $window.atob(toParams.task) || undefined);
        } else {
            $scope.filteredTags = [];
        }
    });

    $scope.$on('set-query', function (event, query) {
        $scope.query = query;
    });

    $scope.$on('set-active-query', function (event, activeQuery) {
        $scope.activeQuery = activeQuery;
    });

    $scope.$on('filter-update', refresh);

    $scope.$watch('filteredTags', function (newValue, oldValue) {
        if (newValue !== undefined) {
            refresh();
        }
    }, true);

    doQuery($state.params.task && $window.atob($state.params.task) || undefined);
});