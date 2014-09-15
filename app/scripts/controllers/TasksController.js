'use strict';

angular.module('mobbr.controllers').controller('TasksController', function ($scope, $rootScope, $state, $stateParams, mobbrSession, MobbrUri, MobbrKeywords, MobbrApi) {

    function languageUpdate(newValue, oldValue) {
        if (newValue && newValue !== oldValue) {
            $scope.$emit('language-update', newValue);
            queryTasks();
        }
    }

    function queryTasks() {
        $scope.tasks = MobbrUri.get({
            language: $scope.filter_language,
            keywords: $scope.filteredTags
        });
    }

    $scope.$on('update-tags', queryTasks);
    $scope.$watch('filter_language', languageUpdate, true);
    $scope.$watch('user_tasks', queryTasks);
});