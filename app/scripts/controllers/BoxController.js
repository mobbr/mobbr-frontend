/* global purl */
angular.module('mobbr.controllers').controller('BoxController', function ($scope, $rootScope, $state, $window, mobbrSession, MobbrKeywords, MobbrUri) {
    'use strict';

    var language;

    function filterTags(tags) {
        tags = tags || $scope.tags.result;
        $scope.filteredTags = [];
        angular.forEach(tags, function (keyword) {
            $scope.filteredTags.push(keyword.keyword || keyword);
        });
    }

    function topTags() {
        $scope.tags = MobbrKeywords.get({
            language: language
        }, function () {
            filterTags();
        });
    }

    function userTags() {
        $scope.tags = MobbrKeywords.person({
            language: language,
            username: $rootScope.$mobbrStorage.user.username
        }, function () {
            filterTags();
        });
    }

    function urlTags(url) {
        $scope.query = url;
        $scope.tags = MobbrUri.info({
            //include_statistics: false,
            url: url
        }, function (response) {
            $scope.activeQuery = url;
            filterTags(response.result.script.keywords || []);
        }, function () {
            $scope.query = null;
            $scope.activeQuery = null;
            $state.go('^');
        });
    }

    $scope.resetTags = function () {
        if (!$state.includes('box.task') && $state.params.task) {
            urlTags($window.atob($state.params.task));
        } else if($state.includes('box.tasks')) {
            if (mobbrSession.isAuthorized()) {
                userTags();
            } else {
                topTags();
            }
        } else if($state.includes('box.crowds')) {
            $scope.tags = null;
            $scope.filteredTags = null;
            $scope.$broadcast('update-tags');
        }
    }

    $scope.addTag = function () {
        if ($scope.form.newTag && $scope.form.newTag.length > 0) {
            $scope.filteredTags.push($scope.form.newTag);
            $scope.form.newTag = undefined;
            $scope.tagsChanged = true;
        }
    };

    $scope.removeTag = function (tag) {

        var keywords = $scope.filteredTags;

        keywords.splice(keywords.indexOf(tag), 1);

        if (keywords.length === 0) {
            $scope.tagsChanged = false;
        } else if (!$scope.tagsChanged) {
            $scope.tagsChanged = true;
        }
    };

    $scope.topTags = topTags;

    $scope.$watch('filteredTags', function (newValue, oldValue) {
        if (newValue && newValue !== oldValue) {
            $scope.$broadcast('update-tags');
        }
    }, true);

    $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
        if (toState.name.split('.')[1] !== fromState.name.split('.')[1]) {
            $scope.tags = null;
            $scope.filteredTags = null;
            $scope.query = null;
            $scope.activeQuery = null;
        }
        if (!toParams.task) {
            $scope.query = null;
            $scope.activeQuery = null;
        }
    });

    $scope.$on('$stateChangeSuccess', $scope.resetTags);

    $scope.$on('set-query', function (event, query) {
        $scope.query = query;
    });

    $scope.$on('set-active-query', function (event, activeQuery) {
        $scope.activeQuery = activeQuery;
    });

    $scope.$on('language-update', function (event, new_language) {
        language = new_language;
        $scope.resetTags();
    });

    $scope.resetTags();
});