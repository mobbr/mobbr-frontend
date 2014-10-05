angular.module('mobbr.controllers').controller('TaskController', function ($scope, $state, $window, $rootScope, MobbrUri) {
    'use strict';

    function redirect() {
        if ($scope.has_failed) {
            $state.go('box.task.index.domain');
        } else if (!$scope.has_script) {
            $state.go('box.task.index.script');
        } else if (!$scope.has_participants) {
            $state.go('box.task.index.invite');
        } else if (!$scope.has_payments && $state.is('box.task.index.payments')) {
            $state.go('box.task.index.view');
        }
    }

    function queryTask(task) {

        var url = $window.atob(task);
        $scope.$emit('set-query', url);
        $scope.domain = purl(url).data.attr.host;
        $scope.task = MobbrUri.info({ url: url }, function (response) {

            if (response.result.script && response.result.script.url && response.result.script.url !== url) {
                $state.go($state.includes('box.task.index') ? $state.current.name : 'box.task.index', { task: $window.btoa(response.result.script.url) });
                $scope.$emit('set-query', response.result.script.url);
                url = $scope.query;
            }

            $scope.url = url;
            $scope.has_failed = response.result.script && response.result.script.error;
            $scope.has_script = $scope.has_failed && false || response.result.script && response.result.script.url && true;
            $scope.has_payments = parseFloat(response.result.statistics.num_payments) > 0;
            $scope.has_participants = parseFloat(response.result.statistics.num_recipients) > 0;
            $scope.$emit('set-active-query', url);

            redirect();

        }, function () {

            $scope.has_failed = true;
            $scope.has_script = false;
            $scope.has_payments = false;
            $scope.has_participants = false;
            $scope.$emit('set-active-query', url);

            redirect();
        });
    }

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if ($scope.task === undefined || toParams.task !== fromParams.task && toState.name.indexOf('box.task.index') === 0 && toParams.task) {
            queryTask(toParams.task);
        }
    });


    if ($state.params.task) {
        queryTask($state.params.task);
    }
});