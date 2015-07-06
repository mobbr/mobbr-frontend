angular.module('mobbr.controllers').controller('TaskController', function ($scope, $state, $window, $rootScope, uniqueFilter, MobbrUri, uiUrl, task) {
    'use strict';

    var url = $state.params.task && $window.atob($state.params.task) || null;

    if (task === null) {
        if ($window.document.referrer && $window.document.referrer.indexOf($window.location.origin) === -1){
            $state.go('task', { task: $window.btoa($window.document.referrer) });
        } else {
            $state.go('main');
        }
    } if (task !== null && task.result.script && task.result.script.url && task.result.script.url !== url) {
        $state.go('task', { task: $window.btoa(task.result.script.url) });
    } else {
        $scope.task = task;
        $scope.domain = purl(url).data.attr.host;
        $scope.url = url;
        $scope.has_failed = task && task.result.script && task.result.script.error || false;
        $scope.has_script = $scope.has_failed && false || task && task.result.script && task.result.script.url && true;
        if (!$scope.has_failed && $scope.has_script) {
            $scope.has_payments = task && parseFloat(task.result.statistics.num_payments) > 0;
            $scope.has_participants = task && task.result.statistics.num_recipients && parseInt(task.result.statistics.num_recipients) > 0 && uniqueFilter(task.result.script.participants, 'id').length > 0 || false;
        }
        $rootScope.query = url;
        $rootScope.activeQuery = url;
        //$scope.$emit('set-task', $scope.has_script && task || null);
    }
});