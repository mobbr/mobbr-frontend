angular.module('mobbr.controllers').controller('CrowdsController', function ($scope, $state, $window, $rootScope, mobbrMsg, mobbrSession, MobbrUri, MobbrPerson) {
    'use strict';

    function queryPeople() {
        if ($state.params.task) {
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
        } else {
            $scope.persons = null;
        }
    }

    $scope.resetTags = function () {

        var url;

        $scope.persons = null;

        if ($state.params.task) {

            url = $window.atob($state.params.task);
            $scope.tags = null;
            $scope.filteredTags = null;

            $scope.$emit('set-query', url);
            MobbrUri.info({
                url: url
            }, function (response) {
                $scope.$emit('set-active-query', url);
                $scope.tags = response.result.script.keywords || [];
            }, function () {
                $scope.$emit('set-query');
                $scope.$emit('set-active-query');
                mobbrMsg.add({ msg: 'Invalid URL' });
                $state.go('^');
            });
        } else {
            $scope.tags = undefined;
        }
    }

    $scope.addPerson = function (person) {
        if (person.selected === true) {
            $scope.selectedPersons.push(person);
        } else {
            $scope.removePerson(person);
        }
    };

    $scope.removePerson = function (person) {
        if (person) {
            if(person.selected === true){
                person.selected = false;
            }
            $scope.selectedPersons.splice($scope.selectedPersons.indexOf(person), 1);
        } else {
            angular.forEach($scope.selectedPersons, function (item) {
                item.selected = false;
            });
            $scope.selectedPersons = [];
        }
    };

    $scope.invitePeople = function () {

        var ids = [];

        angular.forEach($scope.selectedPersons, function (person) {
            ids.push(person.username);
        });

        $scope.invite = MobbrPerson.invite({ids: ids, url: $scope.activeQuery});
        $scope.invite.$promise.then(function () {
            $scope.selectedPersons = [];
            $scope.removePerson();
        });
    };

    $scope.filterUser = function (item) {
        if (!mobbrSession.isAuthorized()) return true;
        return item.username !== $rootScope.$mobbrStorage.user.username;
    }

    $scope.$on('$stateChangeSuccess', $scope.resetTags);
    $scope.$watch('filter_language', function (newValue, oldValue) {
        if (newValue && newValue !== oldValue) {
            $scope.resetTags();
        }
    }, true);
    $scope.$watch('filteredTags', function (newValue, oldValue) {
        if (newValue && newValue !== oldValue) {
            queryPeople();
        }
    }, true);
    $scope.form = {};
    $scope.selectedPersons = [];
});
