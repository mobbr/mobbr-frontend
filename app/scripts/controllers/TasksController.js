'use strict';

angular.module('mobbr.controllers').controller('TasksController', function ($scope, $state, $rootScope, mobbrMsg, MobbrUri, MobbrKeywords, tasks, tags) {

    var username = $state.params.username || null;
    $scope.filteredTags =  [];
    if($state.params.keywords) {
        var keywords = $state.params.keywords.split('+');
        $scope.filteredTags = keywords;
    }

    $scope.queryTasks = function (limit) {

        $scope.limiter = limit || $scope.initial_limit;

        if (!limit) {
            $scope.tasks = [];
        }

        MobbrUri.get({
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

        MobbrKeywords.get(params, function (response) {
            $scope.suggestedTags = $scope.suggestedTags.concat(response.result);
        });
    };

    $scope.$watch('filteredTags', function (newValue, oldValue) {
        var next_state = 'tasks';
        if($scope.filteredTags.length) {
            next_state += '.filter';
        }
        $state.go(next_state, {username: username, keywords: $scope.filteredTags.join('+')});
    }, true);

    $scope.$watch('$state.params.keywords', function (newValue, oldValue) {
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