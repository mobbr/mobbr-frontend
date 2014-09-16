angular.module('mobbr.controllers').controller('CrowdsController', function ($scope, $state, $window, $rootScope, mobbrSession, MobbrUri, MobbrPerson, MobbrKeywords) {
    'use strict';

    function filterUpdate(newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.$emit('filter-update');
        }
    }

    function findPeopleOnTags(keywords) {

        $scope.persons = MobbrPerson.get({
            keywords: keywords,
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

    function findPeopleOnUrl(url) {
        $scope.persons = MobbrPerson.get({
            url: url
        }, function () {
            $scope.$emit('set-active-query', url);
        });
    }

    $scope.addPerson = function (person) {
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

        $scope.invite = MobbrPerson.invite({ids: ids, url: $scope.url});
        $scope.invite.$promise.then(function () {
            $state.go($state.current, {}, {reload: true});
        });
    };

    $scope.$on('update-tags', function () {

        if($scope.filteredTags && $scope.filteredTags.length > 0){
            findPeopleOnTags($scope.filteredTags);
        } else {
            findPeopleOnUrl($scope.query);
        }
    });

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        if (toState.name.indexOf('box.crowds') !== 0) {
            $scope.$emit('set-query');
            $scope.$emit('set-active-query');
        }
    });

    if ($state.params && $state.params.task) {
        $scope.$emit('set-query', $window.atob($state.params.task));
    }

    $scope.$watch('filter_language', filterUpdate);
    $scope.form = {};
    $scope.selectedPersons = [];
});
