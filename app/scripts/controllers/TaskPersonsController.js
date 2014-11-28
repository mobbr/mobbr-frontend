'use strict';

angular.module('mobbr.controllers').controller('TaskPersonsController', function ($scope, $rootScope, $window, $state, MobbrPerson, mobbrSession) {

    $scope.persons = MobbrPerson.uri({
        url: $window.atob($state.params.task),
        base_currency: mobbrSession.isAuthorized() && $rootScope.$mobbrStorage.user.currency_iso || null
    });
});