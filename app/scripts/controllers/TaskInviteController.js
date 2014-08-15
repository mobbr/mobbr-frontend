'use strict';

angular.module('mobbr.controllers').controller('TaskInviteController', function ($scope, $window, $state, MobbrPerson) {

    $scope.checkboxes = {};

    $scope.persons = MobbrPerson.taskCandidates({
        url: $window.atob($state.params.task)
    });

    $scope.invite = function () {

        var ids = [];

        for(var id in $scope.checkboxes) {
            if ($scope.checkboxes[id] === true) {
                ids.push(id);
            }
        }

        if (ids.length > 0) {
            MobbrPerson.invite({
                url: $window.atob($state.params.task),
                ids: ids
            });
        }
    }
});