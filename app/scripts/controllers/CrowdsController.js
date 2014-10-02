angular.module('mobbr.controllers').controller('CrowdsController', function ($scope, $state, $window, $rootScope, mobbrMsg, mobbrSession, MobbrUri, MobbrPerson, MobbrKeywords) {
    'use strict';

    var language;

    function queryPeople() {

        $scope.persons = MobbrPerson.get({
            keywords: $scope.filteredTags,
            language: language
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

    $scope.getSuggestedTags = function () {

        MobbrKeywords.get({
            limit: $scope.tagsLimiter.limit,
            language: language,
            related_to: $scope.filteredTags
        }, function (response) {
            $scope.suggestedTags = response.result;
        });
    }

    $scope.setTask = function () {

        var url = $window.atob($state.params.task);

        $scope.$emit('set-query', url);

        $scope.task = MobbrUri.info({ url: url }, function (response) {

            $scope.$emit('set-active-query', url);

            if (!response.result.script) {
                $scope.no_script = true;
            } else {
                $scope.no_script = false;
                $scope.filteredTags = response.result.script.keywords || [];
            }

        }, function () {
            $scope.$emit('set-query');
            $scope.$emit('set-active-query');
            mobbrMsg.add({ msg: 'Invalid URL' });
            $state.go('^');
        });
    }

    $scope.addPerson = function (person) {
        person.selected === true && $scope.selectedPersons.push(person) || $scope.removePerson(person);
    };

    $scope.removePerson = function (person) {

        if (person && person.selected === true) {
            person.selected = false;
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

    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

        if ($scope.activeQuery) {
            $scope.$emit('set-active-query');
            $scope.$emit('set-query');
            $scope.task = undefined;
            $scope.persons = undefined;
            $scope.filteredTags = undefined;
            $scope.suggestedTags = undefined;
        }

        if (toParams.task) {
            $scope.setTask();
        }
    });

    $scope.$on('language-update', function (event, new_language) {
        if (new_language !== language) {
            language = new_language;
            $scope.getSuggestedTags();
            queryPeople();
        }
    }, true);

    $scope.$watch('filteredTags', function (newValue, oldValue) {
        if (newValue !== undefined) {
            $scope.getSuggestedTags();
            queryPeople();
        }
    }, true);

    $scope.tagsLimiter = { limit: 10 };
    $scope.form = {};
    $scope.selectedPersons = [];
});
