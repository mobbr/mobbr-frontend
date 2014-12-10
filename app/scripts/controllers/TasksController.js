'use strict';

angular.module('mobbr.controllers').controller('TasksController', function ($scope, $state, $rootScope, mobbrMsg, MobbrUri, MobbrKeywords, tasks, tags) {

    var username = $state.params.username || null;

    $scope.queryTasks = function (limit) {

        $scope.limiter = limit || $scope.initial_limit;

        if (!limit) {
            $scope.tasks = [];
        }

        $scope.tasks.$get({
            limit: $scope.initial_limit,
            language: $scope.language,
            keywords: $scope.filteredTags,
            username: username,
            offset: $scope.limiter - $scope.initial_limit
        }, function (response) {
            $scope.tasks = $scope.tasks.concat(response.result);
        });
    };

    $scope.queryTags = function (limit) {

        var params;

        $scope.tagsLimiter = limit || $scope.tagsInitialLimit;

        if (!limit) {
            $scope.suggestedTags = [];
        }

        params = {
            limit: $scope.tagsInitialLimit,
            language: $scope.language,
            related_to: $scope.filteredTags,
            offset: $scope.tagsLimiter - $scope.tagsInitialLimit
        };

        if ($state.params.username) {
            params.username = $state.params.username;
        }

        $scope.tags.$get(params, function (response) {
            $scope.suggestedTags = $scope.suggestedTags.concat(response.result);
        });
    };

    $scope.$watch('filteredTags', function (newValue, oldValue) {
        if (newValue && newValue !== oldValue) {
            $scope.queryTasks();
            $scope.queryTags();
        }
    }, true);

    $scope.$on('language-update', function (event, new_language) {
        if (new_language !== $scope.language) {
            $scope.language = new_language;
            $scope.queryTasks();
        }
    }, true);

    $scope.tagsInitialLimit = 10;
    $scope.tagsLimiter = $scope.tagsInitialLimit;
    $scope.suggestedTags = tags.result;
    $scope.filteredTags = [];
    $scope.tasks = tasks.result;
    $scope.initial_limit = 20;
    $scope.limiter = $scope.initial_limit;
    $scope.$emit('set-active-query', username);
    $scope.$emit('set-query', username);
});