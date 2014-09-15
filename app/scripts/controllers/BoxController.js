/* global purl */
angular.module('mobbr.controllers').controller('BoxController', function ($scope, $rootScope, $state, $window, mobbrSession, MobbrKeywords) {
    'use strict';

    var language;

    function filterTags() {
        $scope.filteredTags = [];
        angular.forEach($scope.tags.result, function (keyword) {
            $scope.filteredTags.push(keyword.keyword);
        });
    }

    function topTags() {
        $scope.tags = MobbrKeywords.get({
            language: $scope.filter_language
        }, filterTags);
    }

    function userTags() {
        $scope.tags = MobbrKeywords.person({
            language: $scope.filter_language,
            username: $rootScope.$mobbrStorage.user.username
        }, filterTags);
    }

    function urlTags(url) {
        $scope.tags = MobbrKeywords.uri({
            language: $scope.filter_language,
            url: url
        }, filterTags);
    }

    $scope.resetTags = function () {
        if ($state.params.task) {
            urlTags($window.atob($state.params.task));
        } else if (mobbrSession.isAuthorized()) {
            userTags();
        } else {
            topTags();
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