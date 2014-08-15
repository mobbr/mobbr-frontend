'use strict';

angular.module('mobbr.controllers').controller('TasksController', function ($scope, $rootScope, $state, $window, MobbrUri) {

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
                $scope.queryTask(toParams.task);
            }
        }
    });

    $rootScope.$on('$stateChangeSuccess', redirect);

    $scope.encodeTask = function (url) {
        return $window.btoa(url);
    }

    $scope.setTask = function (url) {
        $state.go($state.includes('tasks.view.task') ? $state.current.name : 'tasks.view.task', { task: $window.btoa(url) });
    }

    $scope.queryTask = function (task) {

        var url = $window.atob(task);

        $scope.query = url;
        $scope.domain = new $window.URL(url).hostname;

        $scope.task = MobbrUri.info({ url: url }, function (response) {

            if (response.result.script && response.result.script.url && response.result.script.url !== url) {
                $scope.query = response.result.script.url;
                $scope.setTask($scope.query);
                url = $scope.query;
            }

            $scope.url = url;
            $scope.has_failed = false;
            $scope.has_script = response.result.script !== undefined && response.result.script.url !== undefined;
            $scope.has_payments = parseFloat(response.result.statistics.amount_total) > 0;
            $scope.has_participants = parseFloat(response.result.statistics.num_partipants) > 0;
            redirect();

        }, function () {

            $scope.has_failed = true;
            $scope.has_script = false;
            $scope.has_payments = false;
            $scope.has_participants = false;
            redirect();
        });
    }

    $scope.state = $state;
});