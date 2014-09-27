angular.module('mobbr.directives').directive('smartTags', function factory(MobbrKeywords) {
    'use strict';

    return {
        restrict: 'E',
        replace: true,
        transclude:true,
        templateUrl: 'views/directives/smarttags.html',
        scope: {
            tags: '=',
            filteredTags: '=',
            resetTags: '=',
            language: '='
        },
        link: function ($scope) {

            function filterTags() {
                $scope.filteredTags = [];
                angular.forEach($scope.tags, function (keyword) {
                    $scope.filteredTags.push(keyword.keyword || keyword);
                });
            }

            $scope.addTag = function () {
                if ($scope.form.newTag && $scope.form.newTag.length > 0) {
                    $scope.filteredTags.push($scope.form.newTag);
                    $scope.form.newTag = undefined;
                    $scope.tagsChanged = true;
                }
            };

            $scope.removeTag = function (tag) {

                var keywords = $scope.filteredTags;

                keywords.splice(keywords.indexOf(tag), 1);

                if (keywords.length === 0) {
                    $scope.tagsChanged = false;
                } else if (!$scope.tagsChanged) {
                    $scope.tagsChanged = true;
                }
            };

            $scope.topTags = function () {
                MobbrKeywords.get({
                    language: $scope.language
                }, function (response) {
                    $scope.tags = response.result;
                    filterTags();
                });
            }

            $scope.$watch('tags', filterTags);
            $scope.$on('mobbrApi:authchange', $scope.resetTags);
        }
    };
});