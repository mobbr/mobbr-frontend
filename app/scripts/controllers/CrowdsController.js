angular.module('mobbr.controllers').controller('CrowdsController', function ($scope, $state, MobbrUri, MobbrPerson) {
    'use strict';

    $scope.form = {};
    $scope.selectedPersons = [];

    function resetTags() {
        $scope.filteredTags = [];
        angular.forEach($scope.tags.result.script.keywords, function (keyword) {
            $scope.filteredTags.push(keyword);
        });
    }

    function findPeopleOnUrl(url) {
        $scope.persons = MobbrPerson.taskCandidates(
            {
                url: url
            }
        );
    }

    $scope.$watch('url', function (url) {
        if (url) {
            $scope.tags = MobbrUri.info({
                url: url
            });

            $scope.tags.$promise.then(function () {
                if ($scope.tags.result) {
                    resetTags();
                }
            });
            findPeopleOnUrl(url);
        }
    });

    if ($state.params && $state.params.urlHash) {
        $scope.url = window.atob($state.params.urlHash);
    }

    $scope.$on('$stateChangeStart', function (event, toState, toParams) {
        if ($state.includes('crowds.view.filter')) {
            if (toParams && toParams.urlHash) {
                $scope.url = window.atob(toParams.urlHash);
            }
        }
    });


    $scope.resetTags = function () {
        resetTags();
    };

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

    $scope.addTag = function () {
        if ($scope.form.newTag && $scope.form.newTag.length > 0) {
            $scope.filteredTags.push($scope.form.newTag);
            $scope.form.newTag = undefined;
            findPeopleOnTags($scope.filteredTags);
        }
    };

    $scope.removeTag = function (tag) {
        var keywords = $scope.filteredTags;
        keywords.splice(keywords.indexOf(tag), 1);
        findPeopleOnTags(keywords);
    };

    $scope.$watch('filteredTags', function (keywords, oldValue) {
        if (oldValue !== undefined) {
            if(keywords.length !== $scope.tags.result.script.keywords.length){
                findPeopleOnTags(keywords);
            }else{
                findPeopleOnUrl($scope.url);
            }
        }
    });

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


});
