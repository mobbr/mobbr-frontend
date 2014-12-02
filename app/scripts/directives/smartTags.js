angular.module('mobbr.directives').directive('smartTags', function factory(MobbrKeywords, $state) {
    'use strict';

    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: 'views/directives/smarttags.html',
        scope: {
            filteredTags: '=',
            suggestedTags: '=',
            language: '=',
            limiter: '=',
            clickMore: '=',
            initialLimit: '='
        },
        link: function ($scope) {

            $scope.addTag = function (keyword) {

                if (keyword) {
                    $scope.filteredTags.push(keyword);
                } else if ($scope.form.newTag && $scope.form.newTag.length > 0) {
                    $scope.filteredTags.push($scope.form.newTag);
                    $scope.form.newTag = undefined;
                    $scope.tagsChanged = true;
                }
            };

            $scope.removeTag = function (tag) {

                var keywords = $scope.filteredTags;

                keywords.splice(keywords.indexOf(tag), 1);
            };

            $scope.filterKeyword = function (item) {
                return !$scope.filteredTags || $scope.filteredTags.indexOf(item.keyword) === -1;
            };

            /*$scope.moreTags = function (limit) {

                 var params;

                $scope.limiter = limit || $scope.initial_limit;

                if (!limit) {
                    $scope.suggestedTags = [];
                    $scope.tagPromise = null;
                }

                params = {
                    limit: $scope.initial_limit,
                    language: $scope.language,
                    related_to: $scope.filteredTags
                };

                if ($state.params.username) {
                    params.username = $state.params.username;
                }

                if ($scope.limiter > $scope.initial_limit) {
                    params.offset = $scope.limiter - $scope.initial_limit;
                }

                if ($scope.tagPromise || !limit) {
                    $scope.tagPromise = MobbrKeywords[params.username && 'person' || 'get'](params, setSuggestedTags);
                }
            };*/
        }
    };
});