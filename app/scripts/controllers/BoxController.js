/* global purl */
angular.module('mobbr.controllers').controller('BoxController', function ($scope, MobbrKeywords) {
    'use strict';

    function refreshTags() { $scope.tagsChanged = $scope.tags && $scope.tags.result && $scope.tags.result.length !== $scope.filteredTags.length;
        $scope.$broadcast('update-tags');
    }

    $scope.resetTags = function () {
        $scope.filteredTags = [];
        angular.forEach($scope.tags.result, function (keyword) {
            $scope.filteredTags.push(keyword.keyword);
        });
    };

    $scope.addTag = function () {
        if ($scope.form.newTag && $scope.form.newTag.length > 0) {
            $scope.filteredTags.push($scope.form.newTag);
            $scope.form.newTag = undefined;
        }
    };

    $scope.topTags = function () {
        MobbrKeywords.get({ limit: 10 }, function (response) {
            if (response.result) {
                angular.forEach(response.result, function (keyword) {
                    $scope.filteredTags.push(keyword.keyword);
                });
            }
        })
    };

    $scope.removeTag = function (tag) {
        var keywords = $scope.filteredTags;
        keywords.splice(keywords.indexOf(tag), 1);
    };

    $scope.$on('set-tags', function (event, method, params) {
        $scope.tags = MobbrKeywords[method](params);
        $scope.tags.$promise.then($scope.resetTags);
    });

    $scope.$on('set-query', function (event, query) {
        $scope.query = query;
    });

    $scope.$on('set-active-query', function (event, activeQuery) {
        $scope.activeQuery = activeQuery;
    });

    $scope.$watch('filteredTags', function (newValue, oldValue) {
        if (newValue !== undefined) {
            refreshTags();
        }
    }, true);

    $scope.$watch('filter_language', function (newValue, oldValue) {
        if (newValue !== undefined) {
            refreshTags();
        }
    });
});