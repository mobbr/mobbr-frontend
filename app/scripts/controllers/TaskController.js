angular.module('mobbr.controllers').controller('TaskController', function ($scope, $state, $window, $rootScope, MobbrUri) {
    'use strict';

    function queryTask(task) {

        var url = $window.atob(task);
        $scope.$emit('set-query', url);
        $scope.domain = purl(url).hostname;
        $scope.task = MobbrUri.info({ url: url }, function (response) {

            if (response.result.script && response.result.script.url && response.result.script.url !== url) {
                $state.go($state.includes('box.task.view') ? $state.current.name : 'box.task.view', { task: $window.btoa(response.result.script.url) });
                $scope.$emit('set-query', response.result.script.url);
                url = $scope.query;
            }

            $scope.url = url;
            $scope.has_failed = response.result.script && response.result.script.error;
            $scope.has_script = $scope.has_failed && false || response.result.script.url && true;
            $scope.has_payments = parseFloat(response.result.statistics.num_payments) > 0;
            $scope.has_participants = (parseFloat(response.result.statistics.num_recipients) + parseFloat(response.result.statistics.num_senders)) > 0;
            $scope.$emit('set-active-query', url);

        }, function () {

            $scope.has_failed = true;
            $scope.has_script = false;
            $scope.has_payments = false;
            $scope.has_participants = false;

            switch ($state.current.name) {
                case 'box.task.view':
                case 'box.task.view.invite':
                case 'box.task.view.payments':
                case 'box.task.view.pay':
                case 'box.task.view.persons':
                    $state.go('box.task.view.domain');
                    break;
            }

            $scope.$emit('set-active-query', url);
        });
    }

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        if (toState.name.indexOf('box.task.view') === 0 && toParams.task) {
            queryTask(toParams.task);
        }
    });

    queryTask($state.params.task);
});