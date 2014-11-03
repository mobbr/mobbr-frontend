angular.module('mobbr.directives').directive('smartTags', function factory(MobbrKeywords) {
    'use strict';

    return {
        restrict: 'E',
        replace: true,
        transclude:true,
        templateUrl: 'views/directives/smarttags.html',
        scope: {
            filteredTags: '=',
            tagsLimiter: '=',
            suggestedTags: '=',
            getSuggestedTags: '='
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

            $scope.$on('mobbrApi:authchange', function () {
                $scope.getSuggestedTags();
            });
        }
    };
});