'use strict';

angular.module('mobbr.controllers').controller('TasksController', function ($scope, $rootScope, MobbrUri) {

    function languageUpdate(newValue, oldValue) {
        if (newValue && newValue !== oldValue) {
            $scope.$emit('language-update', newValue);
            queryTasks();
        }
    }

    function queryTasks() {
        $scope.tasks = MobbrUri.get({
            language: $scope.filter_language,
            keywords: $scope.user_tasks ? null : $scope.filteredTags,
            username: $scope.user_tasks ? $rootScope.$mobbrStorage.user.username : null
        });
    }

    $scope.$on('update-tags', queryTasks);
    $scope.$watch('filter_language', languageUpdate, true);
    $scope.$watch('user_tasks', queryTasks);
});