angular.module('mobbr.controllers').controller('TaskController', function ($scope, $state, $window, $rootScope, MobbrUri, task) {
    'use strict';

    var url = $window.atob($state.params.task);

    if (task !== null) {

        if (task.result.script && task.result.script.url && task.result.script.url !== url) {
            $state.go('box.task', { task: $window.btoa(task.result.script.url) });
        } else {
            $scope.task = task;
            $scope.domain = purl(url).data.attr.host;
            $scope.url = url;
            $scope.has_failed = task.result.script && task.result.script.error || false;
            $scope.has_script = $scope.has_failed && false || task.result.script && task.result.script.url && true;
            $scope.has_payments = parseFloat(task.result.statistics.num_payments) > 0;
            $scope.has_participants = task.result.script.participants && task.result.script.participants.length > 0;
            $scope.$emit('set-query', url);
            $scope.$emit('set-active-query', url);
            $scope.$emit('set-task-type', task.result.script.type);
            $scope.$emit('set-task-message', task.result.script.message);
            $scope.$emit('set-task-addresses', task.result.addresses);
        }
    }
});