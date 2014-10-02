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

    $scope.filteredTags = [];
    $scope.tagsLimiter = { limit: 10 };

    $scope.$on('$stateChangeSuccess', function () {

        if ($scope.activeQuery) {
            $scope.$emit('set-active-query');
            $scope.$emit('set-query');
            $scope.tasks = undefined;
            $scope.filteredTags = undefined;
            $scope.suggestedTags = undefined;
        }

        queryTasks();
        $scope.getSuggestedTags();
    });

    $scope.$on('language-update', function (event, new_language) {
        if (new_language !== language) {
            language = new_language;
            $scope.getSuggestedTags();
            queryTasks();
        }
    }, true);

    $scope.$watch('filteredTags', function (newValue, oldValue) {
        if (newValue && newValue.length > 0 && newValue !== oldValue) {
            $scope.getSuggestedTags();
            queryTasks();
        }
    }, true);

    $scope.$on('mobbrApi:authchange', function () {
        $scope.getSuggestedTags();
    });
});