'use strict';

angular.module('mobbr.controllers').controller('TasksController', function ($scope, $rootScope, $state, $stateParams, mobbrSession, MobbrUri, MobbrKeywords, MobbrApi) {

    function filterUpdate(newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.$emit('filter-update');
        }
    }

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

    $scope.$on('update-tags', function () {
        $scope.tasks = MobbrUri.get({
            language: $scope.filter_language,
            keywords: $scope.filteredTags,
            username: $scope.user_tasks && $rootScope.$mobbrStorage.user && $rootScope.$mobbrStorage.user.username || null
        });
    });

    $scope.filter_order = $scope.order_options[0].code;

    $scope.$watch('filter_language', filterUpdate);
    $scope.$watch('filter_order', filterUpdate);
    $scope.$watch('user_tasks', filterUpdate);
});