'use strict';

angular.module('mobbr.controllers').controller('TasksController', function ($scope, $state, $rootScope, mobbrMsg, MobbrUri, MobbrKeywords) {

    var language;

    function queryTasks() {

        var username = $state.params.username || null

        $scope.$emit('set-query', username);

        $scope.tasks = MobbrUri.get({
            language: language,
            keywords: $scope.filteredTags,
            username: username
        }, function () {
            $scope.$emit('set-active-query', username);
        }, function () {
            $scope.$emit('set-query');
            $scope.$emit('set-active-query');
            $state.go('^');
        });
    }

    $scope.getSuggestedTags = function () {

        var username = $state.params.username || ($rootScope.$mobbrStorage.user && $rootScope.$mobbrStorage.user.username);

        if (username) {
             MobbrKeywords.person({
                language: language,
                username: username,
                limit: $scope.tagsLimiter.limit,
                related_to: $scope.filteredTags
            }, function (response) {
                $scope.suggestedTags = response.result
            });
        } else {
            MobbrKeywords.get({
                limit: $scope.tagsLimiter.limit0,
                language: language,
                related_to: $scope.filteredTags
            }, function (response) {
                $scope.suggestedTags = response.result;
            });
        }
    }

    $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if ($scope.activeQuery) {
            $scope.$emit('set-active-query');
            $scope.$emit('set-query');
            $scope.tasks = undefined;
            $scope.filteredTags = [];
            $scope.suggestedTags = [];
        }
    });

    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $scope.getSuggestedTags();
        queryTasks();
    });

    $scope.$on('language-update', function (event, new_language) {
        if (new_language !== language) {
            language = new_language;
            $scope.getSuggestedTags();
            queryTasks();
        }
    }, true);

    $scope.$watch('filteredTags', function (newValue, oldValue) {
        if (newValue && newValue !== oldValue) {
            $scope.getSuggestedTags();
            queryTasks();
        }
    }, true);

    $scope.filteredTags = [];
    $scope.tagsLimiter = { limit: 10 };
});