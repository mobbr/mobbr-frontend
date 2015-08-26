'use strict';

angular.module('mobbr.controllers').controller('TasksController', function ($scope, $state, $stateParams, $rootScope, mobbrMsg, MobbrUri, MobbrKeywords, tasks, tags) {

    var username = $state.params.username || null;
    var offset = 0;
    var new_offset;
    $scope.filteredTags =  [];

    $scope.queryTasks = function (limit) {

        $scope.limiter = limit || $scope.initial_limit;

        if (!limit) {
            $scope.tasks = [];
        }

        new_offset = $scope.limiter - $scope.initial_limit;

        $scope.tasksPromise = MobbrUri.get({
            limit: $scope.initial_limit,
            language: $scope.language,
            keywords: $scope.filteredTags,
            username: username,
            offset: offset
        }, function (response) {
            if (new_offset > offset) {
                $scope.tasks = $scope.tasks.concat(response.result);
            } else {
                $scope.tasks = response.result;
            }
            offset = new_offset;
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

        MobbrKeywords.get(params, function (response) {
            $scope.suggestedTags = $scope.suggestedTags.concat(response.result);
        });
    };

    $scope.$on('$stateChangeSuccess', function () {
        $scope.filteredTags = $state.params.tags ? angular.copy($state.params.tags) : [];
    });

    $scope.$watch('filteredTags', function (newValue, oldValue) {
        if (!angular.equals($scope.filteredTags, $state.params.tags)) {
            $state.go('tasks', {username: username, tags: $scope.filteredTags});
        }
    }, true);

    $scope.$watch('$state.params.tags', function (newValue, oldValue) {
        $scope.queryTasks();
        $scope.queryTags();
    }, true);

    $scope.$watch('filter_language', function (newValue, oldValue) {
        if (newValue !== $scope.language) {
            $scope.language = newValue;
            $scope.queryTasks();
        }
    }, true);

    $scope.tagsInitialLimit = 10;
    $scope.tagsLimiter = $scope.tagsInitialLimit;
    $scope.suggestedTags = tags.result;
    //$scope.filteredTags = [];
    $scope.tasks = tasks.result;
    $scope.initial_limit = 20;
    $scope.limiter = $scope.initial_limit;
    $rootScope.activeQuery = username;
    $rootScope.query = username;
});