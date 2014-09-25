'use strict';

angular.module('mobbr.controllers').controller('TasksController', function ($scope, $state, $rootScope, MobbrUri) {

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
            username: $state.params.person || null
        });
    }

    function setMyTasks() {
        if ($state.current.name === 'box.tasks.my') {
            $scope.user_tasks = true;
        } else {
            $scope.user_tasks = false;
        }
    }

    $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
        if (toState.name.indexOf('box.tasks') === 0) {
            setMyTasks();
        }
    });

    setMyTasks();
    $scope.$on('update-tags', queryTasks);
    $scope.$watch('filter_language', languageUpdate, true);
    $scope.$watch('user_tasks', queryTasks);
});