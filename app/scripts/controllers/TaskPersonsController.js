'use strict';

angular.module('mobbr.controllers').controller('TaskPersonsController', function ($scope, persons) {
    $scope.persons = persons;;
});