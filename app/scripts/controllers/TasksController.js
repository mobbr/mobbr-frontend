'use strict';

angular.module('mobbr.controllers').controller('TasksController', function ($scope, $state, $rootScope, mobbrMsg, MobbrUri, MobbrKeywords) {

    var language;

    function queryTasks() {
        $scope.tasks = MobbrUri.get({
            language: $scope.filter_language,
            keywords: $scope.filteredTags,
            username: $state.params.username || null
        });
    }

    $scope.resetTags = function (limit) {

        var username = $state.params.username || ($rootScope.$mobbrStorage.user && $rootScope.$mobbrStorage.user.username);

        $scope.tasks = null;

        if (username) {
            $scope.$emit('set-query', $state.params.username || null);
            $scope.tags = null;
            $scope.filteredTags = null;

             MobbrKeywords.person({
                language: language,
                username: username,
                limit: limit || 20
            }, function (response) {
                $scope.$emit('set-active-query', $state.params.username || null);
                $scope.userTasks = ($rootScope.$mobbrStorage.user && $rootScope.$mobbrStorage.user.username) === $state.params.username;
                $scope.tags = response.result
            }, function () {
                $scope.$emit('set-query');
                $scope.$emit('set-active-query');
                $state.go('^');
            });
        } else {
            MobbrKeywords.get({
                limit: limit || 20,
                language: language
            }, function (response) {
                $scope.tags = response.result;
            });
        }
    }

    $scope.$on('$stateChangeSuccess', function () {
        $scope.resetTags($scope.tagsLimiter);
    });
    $scope.$on('language-update', function (event, new_language) {
        if (new_language !== language) {
            language = new_language;
            $scope.resetTags($scope.tagsLimiter);
        }
    }, true);
    $scope.$watch('filteredTags', function (newValue, oldValue) {
        if (newValue && newValue.length > 0 && newValue !== oldValue) {
            queryTasks();
        }
    }, true);
});