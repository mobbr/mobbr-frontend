angular.module('mobbr.controllers').controller('CrowdsController', function ($scope, $state, $window, $rootScope, mobbrSession, MobbrUri, MobbrPerson) {
    'use strict';

    function queryPeople() {

        $scope.persons = MobbrPerson.get({
            keywords: $scope.filteredTags,
            language: $scope.filter_language
        });

        $scope.persons.$promise.then(function () {
            angular.forEach($scope.selectedPersons, function (selectedPerson) {
                for (var i = 0; i < $scope.persons.result.length; i++) {
                    var person = $scope.persons.result[i];
                    if (selectedPerson.id === person.id) {
                        $scope.persons.result[i] = selectedPerson;
                    }
                }
            });
        });
    }

    $scope.addPerson = function (person) {
        console.log(person);
        if (person.selected === true) {
            $scope.selectedPersons.push(person);
        } else {
            $scope.removePerson(person);
        }
    };

    $scope.removePerson = function (person) {
        if(person.selected === true){
            person.selected = false;
        }
        $scope.selectedPersons.splice($scope.selectedPersons.indexOf(person), 1);
    };

    $scope.invitePeople = function () {

        var ids = [];

        angular.forEach($scope.selectedPersons, function (person) {
            ids.push('https://api.mobbr.com/id/' + person.id);
        });

        $scope.invite = MobbrPerson.invite({ids: ids, url: $scope.activeQuery});
        $scope.invite.$promise.then(function () {
            $state.go($state.current, {}, {reload: true});
        });
    };

    $scope.$on('update-tags', queryPeople);
    $scope.$watch('filter_language', function (newValue, oldValue) {
        if (newValue && newValue !== oldValue) {
            $scope.$emit('language-update', newValue);
            queryPeople();
        }
    }, true);

    $scope.form = {};
    $scope.selectedPersons = [];
});
