angular.module('mobbr.controllers').controller('CrowdsController', function ($scope, $state, $window, $rootScope, mobbrMsg, mobbrSession, MobbrUri, MobbrPerson, MobbrKeywords) {
    'use strict';

    var language;

    function queryPeople() {

        var tags;

        if ($scope.filteredTags.length === 0) {
            tags = [];
            angular.forEach($scope.suggestedTags, function (item) {
                tags.push(item.keyword);
            });
        }  else {
            tags = $scope.filteredTags;
        }

        $scope.persons = MobbrPerson.get({
            keywords: tags,
            language: language
        });

        $scope.persons.$promise.then(function () {
            angular.forEach($scope.selectedPersons, function (selectedPerson) {
                for (var i = 0; i < $scope.persons.result.length; i++) {
                    var person = $scope.persons.result[i];
                    if (selectedPerson.username === person.username) {
                        $scope.persons.result[i].selected = true;
                    }
                }
            });
        });
    }

    function getGlobalTags() {

        return MobbrKeywords.get({
            limit: $scope.tagsLimiter.limit,
            language: language,
            related_to: $scope.filteredTags
        }, function (response) {
            $scope.suggestedTags = response.result;
        });
    }

    function setInvalidTask() {
        $scope.$emit('set-query');
        $scope.$emit('set-active-query');
        mobbrMsg.add({ msg: 'Invalid URL' });
        $state.go('^');
    }

    function setTaskTags(response) {

        var tags,
            url = $window.atob($state.params.task);

        $scope.$emit('set-active-query', url);

        if (response.result.script && response.result.script.length !== 0) {

            $scope.no_script = false;
            tags = response.result.script.keywords || [];

            angular.forEach(tags, function (keyword) {
                $scope.suggestedTags.push({ keyword: keyword });
            });

            if ($scope.suggestedTags.length > 0) {
                queryPeople();
            } else {
                getGlobalTags().$promise.then(queryPeople);
            }
        } else {

            $scope.no_script = true;

            if (response.result.metadata && response.result.metadata.keywords) {
                angular.forEach(response.result.metadata.keywords, function (keyword) {
                    $scope.suggestedTags.push({ keyword: keyword });
                });
            }

            queryPeople();
        }
    }

    $scope.getSuggestedTags = function () {

        var url = $window.atob($state.params.task);

        if ($scope.filteredTags.length > 0) {
            getGlobalTags();
        } else if (!$scope.task) {
            $scope.$emit('set-query', url);
            $scope.task = MobbrUri.info({ url: url });
            $scope.task.$promise.then(setTaskTags, setInvalidTask);
        } else {
            if ($scope.task.$resolved) {
                setTaskTags($scope.task);
            } else {
                $scope.task.$promise.then(setTaskTags);
            }
        }
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

    $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if ($scope.activeQuery) {
            $scope.$emit('set-active-query');
            $scope.$emit('set-query');
            $scope.task = undefined;
            $scope.persons = undefined;
            $scope.filteredTags = [];
            $scope.suggestedTags = [];
        }
    });

    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        if (toParams.task) {
            $scope.getSuggestedTags();
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
        if (newValue && newValue !== oldValue) {
            $scope.getSuggestedTags();
            queryPeople();
        }
    }, true);

    $scope.suggestedTags = [];
    $scope.filteredTags = [];
    $scope.tagsLimiter = { limit: 10 };
    $scope.form = {};
    $scope.selectedPersons = [];
});
