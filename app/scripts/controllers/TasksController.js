'use strict';

angular.module('mobbr.controllers').controller('TasksController', function ($scope, $state, $rootScope, mobbrMsg, MobbrUri, MobbrKeywords) {

    var language,
        initial_limit = 20;

    $scope.queryTasks = function () {

        var username = $state.params.username || null,
            params;

        $scope.$emit('set-query', username);

        params = {
            limit: initial_limit,
            language: language,
            keywords: $scope.filteredTags,
            username: username
        };

        if ($scope.limiter > initial_limit) {
            params.offset = $scope.limiter - initial_limit;
        }

        $scope.tasksPromise = MobbrUri.get(params, function () {
            $scope.$emit('set-active-query', username);
            $scope.tasks = $scope.tasks.concat($scope.tasksPromise.result);
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
            $scope.tasksPromise = undefined;
            $scope.filteredTags = [];
            $scope.suggestedTags = [];
            $scope.tasks = [];
        }
    });

    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $scope.getSuggestedTags();
        $scope.queryTasks();
    });

    $scope.$on('language-update', function (event, new_language) {
        if (new_language !== language) {
            language = new_language;
            $scope.getSuggestedTags();
            $scope.queryTasks();
        }
    }, true);

    $scope.$watch('filteredTags', function (newValue, oldValue) {
        if (newValue && newValue !== oldValue) {
            $scope.getSuggestedTags();
            $scope.queryTasks();
        }
    }, true);

    $scope.tasks = [];
    $scope.limiter = 20;
    $scope.filteredTags = [];
    $scope.tagsLimiter = { limit: 10 };
});