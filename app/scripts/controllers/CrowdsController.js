angular.module('mobbr.controllers').controller('CrowdsController', function ($scope, $state, $window, $rootScope, mobbrSession, MobbrKeywords, task, taskTags, suggestedTags, persons) {
    'use strict';

    var url = $state.params.task && $window.atob($state.params.task) || null,
        suggestedTaskTags = [];

    function setTaskTags() {
        angular.forEach(taskTags, function (keyword) {
            suggestedTaskTags.push({ keyword: keyword });
        });
        $scope.suggestedTags = suggestedTaskTags;
    }

    $scope.queryTags = function (limit) {

        var params;

        $scope.tagsLimiter = limit || $scope.tagsInitialLimit;

        if (!task || taskTags.length === 0 || $scope.filteredTags.length > 0) {

            if (!limit) {
                $scope.suggestedTags = [];
            }

            params = {
                limit: $scope.tagsInitialLimit,
                language: $scope.language,
                related_to: $scope.filteredTags,
                offset: $scope.tagsLimiter - $scope.tagsInitialLimit
            };

            MobbrKeywords.get(params, function (response) {
                $scope.suggestedTags = $scope.suggestedTags.concat(response.result);
            });
        }
    };

    $scope.queryPeople = function (limit) {

        var tags,
            params;

        $scope.limiter = limit || $scope.initial_limit;

        if (!limit) {
            $scope.persons = [];
            $scope.personPromise = undefined;
        }

        if ($scope.task && $scope.filteredTags.length === 0) {

            tags = [];

            angular.forEach($scope.suggestedTags, function (item) {
                tags.push(item.keyword);
            });

        } else {
            tags = $scope.filteredTags;
        }

        params = {
            keywords: tags,
            language: $scope.language,
            limit: $scope.initial_limit,
            offset: $scope.limiter - $scope.initial_limit
        };

        $scope.personPromise = $scope.persons.$get(params);

        $scope.personPromise.$promise.then(function () {

            angular.forEach($scope.selectedPersons, function (selectedPerson) {
                for (var i = 0; i < $scope.personPromise.result.length; i++) {
                    var person = $scope.personPromise.result[i];
                    if (selectedPerson.username === person.username) {
                        $scope.personPromise.result[i].selected = true;
                    }
                }
            });

            $scope.persons = $scope.persons.concat($scope.personPromise.result);
        });
    };

    $scope.addPerson = function (person) {
        person.selected === true && $scope.selectedPersons.push(person) || $scope.removePerson(person);
    };

    $scope.removePerson = function (person) {
        if (person) {
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

        $scope.invite = $scope.persons.$invite({ids: ids, url: $scope.activeQuery});
        $scope.invite.$promise.then(function () {
            $scope.selectedPersons = [];
            $scope.removePerson();
        });
    };

    $scope.filterUser = function (item) {
        return !mobbrSession.isAuthorized() || item.username !== $rootScope.$mobbrStorage.user.username;
    };

    $scope.$on('language-update', function (event, new_language) {
        if (new_language !== $scope.language) {
            $scope.language = new_language;
            $scope.queryPeople();
        }
    }, true);

    $scope.$watch('filteredTags', function (newValue, oldValue) {
        if (newValue && newValue !== oldValue) {

            if ($scope.task && taskTags.length > 0 && $scope.filteredTags.length === 0) {
                setTaskTags();
            } else {
                $scope.queryTags();
            }

            $scope.queryPeople();
        }
    }, true);

    if (task !== null && task.result.script && task.result.script.url && task.result.script.url !== url) {
        $state.go('box.crowds', { task: $window.btoa(task.result.script.url) });
    } else {
        $scope.tagsInitialLimit = 10;
        $scope.tagsLimiter = $scope.tagsInitialLimit;
        $scope.initial_limit = 20;
        $scope.limiter = $scope.initial_limit;
        $scope.filteredTags = [];
        $scope.form = {};
        $scope.selectedPersons = [];
        $scope.task = task;
        $scope.personPromise = persons;
        $scope.persons = $scope.personPromise.result;

        if (task) {
            $scope.no_script = !$scope.task.result.script || !$scope.task.result.script.url;
        }

        if (taskTags) {
            setTaskTags();
        } else {
            $scope.suggestedTags = suggestedTags.result;
        }

        $scope.$emit('set-query', url);
        $scope.$emit('set-active-query', url);
    }
});
