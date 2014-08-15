'use strict';

angular.module('mobbr.controllers').controller('TaskPersonsController', function ($scope, $rootScope, $window, $state, MobbrPerson) {

    $scope.persons = MobbrPerson.uri({
        url: $window.atob($state.params.task)
    });
});