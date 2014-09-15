angular.module('mobbr.controllers').controller('TaskController', function ($scope, $state, $window, $rootScope, MobbrUri) {
    'use strict';

    function redirect() {
        if ($scope.task && $scope.task.$resolved) {
            if ($scope.has_failed) {
                switch ($state.current.name) {
                    case 'box.task.view':
                    case 'box.task.view.invite':
                    case 'box.task.view.payments':
                    case 'box.task.view.pay':
                    case 'box.task.view.persons':
                        $state.go('box.task.view.domain');
                        break;
                }
                return;
            }

            if (!$scope.has_script) {
                switch ($state.current.name) {
                    case 'box.task.view.invite':
                    case 'box.task.view.payments':
                    case 'box.task.view.pay':
                    case 'box.task.view.persons':
                        $state.go('box.task.view');
                        break;
                }
                return;
            }

            if (!$scope.has_payments) {
                switch ($state.current.name) {
                    case 'box.task.view.payments':
                        $state.go('box.task.view.pay');
                        break;
                }
                return;
            }

            if (!$scope.has_participants) {
                switch ($state.current.name) {
                    case 'box.task.view.persons':
                        $state.go('box.task.view.invite');
                        break;
                }
            }
        }
    }

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

            console.log(response.result);

            $scope.url = url;
            $scope.has_failed = false;
            $scope.has_script = response.result.script !== undefined && response.result.script.url !== undefined;
            console.log($scope.has_script);
            $scope.has_payments = parseFloat(response.result.statistics.amount_total) > 0;
            $scope.has_participants = parseFloat(response.result.statistics.num_partipants) > 0;
            $scope.$emit('set-active-query', url);

            redirect();

        }, function () {

            $scope.has_failed = true;
            $scope.has_script = false;
            $scope.has_payments = false;
            $scope.has_participants = false;
            $scope.$emit('set-active-query', url);
        });
    }

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

        if ($state.includes('box.task.view') && toParams.task) {
            if ((!$scope.has_script && $scope.url !== $window.atob(toParams.task)) || ($scope.has_script && toParams.task !== $window.btoa($scope.task.result.script.url))) {
                queryTask($state.params.task);
            }
        }

        if (toState.name.indexOf('box.task.view') !== 0) {
            $scope.$emit('set-query');
            $scope.$emit('set-active-query');
            $scope.task = undefined;
            $scope.url = undefined;
            $scope.has_failed = false;
            $scope.has_script = false;
            $scope.has_payments = false;
            $scope.has_participants = false;
        }
    });

    $scope.$on('$stateChangeSuccess', redirect);
    queryTask($state.params.task);
});