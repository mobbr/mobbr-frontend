'use strict';

angular.module('mobbr.controllers').controller('TasksController', function ($scope, $rootScope, $state, $stateParams, MobbrUri, MobbrKeywords, MobbrApi) {

    $scope.order_options = [
        {
            code: 'new_tasks',
            name: 'New tasks'
        },
        {
            code: 'new_payments',
            name: 'New payments'
        },
        {
            code: 'highest_payments',
            name: 'Highest payments'
        },
        {
            code: 'most_participants',
            name: 'Most participants'
        },
        {
            code: 'recent_pledges',
            name: 'Recent pledges'
        },
        {
            code: 'highest_activity',
            name: 'Highest activity'
        },
        {
            code: 'highest_rewards',
            name: 'Highest rewards'
        }
    ];

    function queryFilter() {
        $scope.tasks = MobbrUri.get({
            language: $scope.filter_language || null,
            keywords: $scope.tag || null,
            username: $scope.user_tasks && $rootScope.$mobbrStorage.user && $rootScope.$mobbrStorage.user.username || null
        });

        $scope.keywords = MobbrKeywords.get({
            language: $scope.filter_language || null,
            related_to: $scope.tag || null
        });
    }

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        $scope.tag = toParams.tag;
        if ($state.includes('box.tasks')) {
            queryFilter();
        }
    });

    $scope.$watch('[ filter_language, filter_order, user_tasks ]', queryFilter, true);
    $scope.languages = MobbrApi.languages({ include_unused: false });
    $scope.tag = $state.params.tag;
    $scope.filter_order = $scope.order_options[0].code;
});