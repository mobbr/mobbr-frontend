'use strict';

angular.module('mobbr.controllers').controller('TaskController', function ($scope, $state, $window, $rootScope) {

    function redirect() {
        if ($scope.has_failed) {
            switch($state.current.name) {
                case 'tasks.view.task':
                case 'tasks.view.task.invite':
                case 'tasks.view.task.payments':
                case 'tasks.view.task.pay':
                case 'tasks.view.task.persons':
                    $state.go('tasks.view.task.domain');
                    break;
            }
            return;
        }
        if (!$scope.has_script) {
            switch($state.current.name) {
                case 'tasks.view.task.invite':
                case 'tasks.view.task.payments':
                case 'tasks.view.task.pay':
                case 'tasks.view.task.persons':
                    $state.go('tasks.view.task');
                    break;
            }
            return;
        }
        if (!$scope.has_payments) {
            switch($state.current.name) {
                case 'tasks.view.task.payments':
                    $state.go('tasks.view.task.pay');
                    break;
            }
            return;
        }
        if (!$scope.has_participants) {
            switch($state.current.name) {
                case 'tasks.view.task.persons':
                    $state.go('tasks.view.task.invite');
                    break;
            }
        }
    }

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        if ($state.includes('tasks.view.task') && toParams.task) {
            if ((!$scope.has_script && $scope.url !==  $window.atob(toParams.task)) || ($scope.has_script && toParams.task !== $window.btoa($scope.task.result.script.url))) {
                $scope.queryTask(toParams.task).$promise.then(redirect);
            }
        }
    });

    $rootScope.$on('$stateChangeSuccess', redirect);
    $scope.queryTask($state.params.task).$promise.then(redirect);
});