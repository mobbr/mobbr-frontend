angular.module('mobbr.controllers').controller('CrowdsController', function ($scope, $state, $window, $rootScope, mobbrSession, MobbrUri, MobbrPerson, MobbrKeywords) {
    'use strict';

    $scope.form = {};
    $scope.selectedPersons = [];

    function resetTags() {
        $scope.filteredTags = [];
        angular.forEach($scope.tags.result, function (keyword) {
            $scope.filteredTags.push(keyword.keyword);
        });
    }

    function queryPeople(url) {

        if (url) {
            $scope.$emit('set-query', url);
            $scope.tags = MobbrKeywords.uri({
                url: url
            });
        } else if (mobbrSession.isAuthorized()) {
            $scope.tags = MobbrKeywords.person({
                username: $rootScope.$mobbrStorage.user.username
            });
        } else {
            $scope.tags = MobbrKeywords.get();
        }

        $scope.tags.$promise.then(resetTags);
    }

    function findPeopleOnTags(keywords) {
        $scope.persons = MobbrPerson.taskCandidates(
            {
                keywords: keywords
            }
        );
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
        $scope.persons = MobbrPerson.taskCandidates({
            url: url
        });
    }

    function refreshTags() {

        if ($scope.tags && $scope.tags.result && $scope.tags.result.length !== $scope.filteredTags.length) {
            $scope.tagsChanged = true;
        } else {
            $scope.tagsChanged = false;
        }

        if($scope.filteredTags && $scope.filteredTags.length > 0){
            findPeopleOnTags($scope.filteredTags);
        } else {
            findPeopleOnUrl($scope.query);
        }
    }

    $scope.resetTags = function () {
        resetTags();
    };

    $scope.addTag = function () {
        if ($scope.form.newTag && $scope.form.newTag.length > 0) {
            $scope.filteredTags.push($scope.form.newTag);
            $scope.form.newTag = undefined;
            refreshTags();;
        }
    };

    $scope.topTags = function () {
        MobbrKeywords.get(function (response) {
            if (response.result) {
                angular.forEach(response.result, function (keyword) {
                    $scope.filteredTags.push(keyword.keyword);
                });
                refreshTags();
            }
        });
    }

    $scope.removeTag = function (tag) {
        var keywords = $scope.filteredTags;
        keywords.splice(keywords.indexOf(tag), 1);
        refreshTags();
    };

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

    $scope.$watch('filteredTags', function (newValue, oldValue) {
        if (newValue !== undefined) {
            refreshTags();
        }
    });

    $scope.$on('$stateChangeStart', function (event, toState, toParams) {

        if (toState.name.indexOf('box.crowds') === 0) {
            queryPeople(toParams.task && $window.atob(toParams.task) || undefined);
        }

        if (toState.name.indexOf('box.crowds.task') !== 0) {
            $scope.$emit('set-query');
        }
    });

    queryPeople($state.params.task && $window.atob($state.params.task) || null);
});
