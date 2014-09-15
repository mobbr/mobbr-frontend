angular.module('mobbr.controllers').controller('CrowdsController', function ($scope, $state, $window, $rootScope, mobbrSession, MobbrUri, MobbrPerson, MobbrKeywords) {
    'use strict';

    function languageUpdate(newValue, oldValue) {
        if (newValue && newValue !== oldValue) {
            $scope.$emit('language-update', newValue);
            queryPeople();
        }
    }

    function queryPeople() {
        if($scope.filteredTags && $scope.filteredTags.length > 0){
            findPeopleOnTags($scope.filteredTags);
        } else {
            findPeopleOnUrl($scope.query);
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

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
        if (fromState.name === 'box.crowds.task' && toState.name !== 'box.crowds.task') {
            $scope.$emit('set-active-query');
            $scope.$emit('set-query');
        }
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        if (toState.name.indexOf('box.crowds') === 0 && toParams.task) {
            $scope.$emit('set-active-query', $window.atob(toParams.task));
        }
    });

    if ($state.params.task) {
        $scope.$emit('set-query', $window.atob($state.params.task));
        $scope.$emit('set-active-query', $window.atob($state.params.task));
    }

    $scope.$on('update-tags', queryPeople);
    $scope.$watch('filter_language', languageUpdate, true);
    $scope.form = {};
    $scope.selectedPersons = [];
});
