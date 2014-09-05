angular.module('mobbr.controllers').controller('CrowdsController', function ($scope, $state, MobbrUri, MobbrPerson) {
    'use strict';

    $scope.form = {};
    $scope.selectedPersons = [];

    console.log('url ' + $state.params.urlHash);
    function resetTags() {
        $scope.filteredTags = [];
        angular.forEach($scope.tags.result.script.keywords, function (keyword) {
            $scope.filteredTags.push(keyword);
        });
    }

    if ($state.params.urlHash) {
        $scope.url = window.atob($state.params.urlHash);

        $scope.tags = MobbrUri.info({
            url: $scope.url
        });

        $scope.tags.$promise.then(function () {
            if ($scope.tags.result) {
                resetTags();
            }
        });

        $scope.persons = MobbrPerson.taskCandidates(
            {
                url: $scope.url
            }
        );
    }

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
            findPeopleOnTags(keywords);
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
        $scope.selectedPersons.splice($scope.selectedPersons.indexOf(person), 1);
    };

    $scope.invitePeople = function () {
        var ids = [];
        angular.forEach($scope.selectedPersons, function(person){
            ids.push('https://api.mobbr.com/id/' +person.id);
        });
        $scope.invite = MobbrPerson.invite({ids:ids, url:$scope.url});
        $scope.invite.$promise.then(function(){
            $state.go($state.current, {}, {reload: true});
        });

    };



});
