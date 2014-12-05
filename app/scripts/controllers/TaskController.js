angular.module('mobbr.controllers').controller('TaskController', function ($scope, $state, $window, $rootScope, uniqueFilter, MobbrUri, task) {
    'use strict';

    var url = $state.params.task && $window.atob($state.params.task) || null;

    if (task !== null && task.result.script && task.result.script.url && task.result.script.url !== url) {
        $state.go('box.task', { task: $window.btoa(task.result.script.url) });
    } else {
        $scope.task = task;
        $scope.domain = purl(url).data.attr.host;
        $scope.url = url;
        $scope.has_failed = task.result.script && task.result.script.error || false;
        $scope.has_script = $scope.has_failed && false || task.result.script && task.result.script.url && true;
        $scope.has_payments = parseFloat(task.result.statistics.num_payments) > 0;
        $scope.has_participants = task.result.statistics.num_recipients && task.result.statistics.num_recipients.length > 0 && uniqueFilter(task.result.script.participants, 'id').length > 1;
        $scope.$emit('set-query', url);
        $scope.$emit('set-active-query', url);
        $scope.$emit('set-task', $scope.has_script && task || null);
    }
});