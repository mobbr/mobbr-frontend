'use strict';

angular.module('mobbr.controllers').controller('TasksController', function ($scope, $rootScope, $state, $window, MobbrUri) {

    $scope.encodeTask = function (url) {
        return $window.btoa(url);
    }

    $scope.setTask = function (url) {
        $state.go($state.includes('tasks.view.task') ? $state.current.name : 'tasks.view.task', { task: $scope.encodeTask(url) });
    }

    $scope.queryTask = function (task) {

        var url = $window.atob(task);

        $scope.query = url;
        $scope.domain = new $window.URL(url).hostname;

        return $scope.task = MobbrUri.info({ url: url }, function (response) {

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

        }, function () {

            $scope.has_failed = true;
            $scope.has_script = false;
            $scope.has_payments = false;
            $scope.has_participants = false;
        });
    }

    $scope.resetTask = function () {
        $scope.task = undefined;
        $scope.url = undefined;
        $scope.has_failed = false;
        $scope.has_script = false;
        $scope.has_payments = false;
        $scope.has_participants = false;
    }
});