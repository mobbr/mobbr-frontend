'use strict';

angular.module('mobbr.controllers').controller('TasksController', function ($scope, $state, $rootScope, mobbrMsg, MobbrUri, MobbrKeywords) {

    function queryTasks() {
        $scope.tasks = MobbrUri.get({
            language: $scope.filter_language,
            keywords: $scope.filteredTags,
            username: $state.params.username || null
        });
    }

    $scope.resetTags = function () {

        var username = $state.params.username || ($rootScope.$mobbrStorage.user && $rootScope.$mobbrStorage.user.username);

        $scope.tasks = null;

        if (username) {
            $scope.$emit('set-query', $state.params.username || null);

            $scope.tags = null;
            $scope.filteredTags = null;

            MobbrKeywords.person({
                language: $scope.filter_language,
                username: username
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
                language: $scope.language
            }, function (response) {
                $scope.tags = response.result;
            });
        }
    }

    $scope.$on('$stateChangeSuccess', $scope.resetTags);
    $scope.$watch('filter_language', function (newValue, oldValue) {
        if (newValue && newValue !== oldValue) {
            $scope.resetTags();
        }
    }, true);
    $scope.$watch('filteredTags', function (newValue, oldValue) {
        if (newValue && newValue.length > 0 && newValue !== oldValue) {
            queryTasks();
        }
    }, true);
});