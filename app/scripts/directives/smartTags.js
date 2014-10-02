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
            tagsTitle: '=',
            tagsLimiter: '='
        },
        link: function ($scope) {

            var language;

            function filterTags() {
                $scope.filteredTags = [];
                angular.forEach($scope.tags, function (keyword) {
                    $scope.filteredTags.push(keyword.keyword || keyword);
                });
            }

            $scope.getTags = function () {
                $scope.tagsPromise && $scope.tagsPromise({
                        limit: $scope.tagsLimiter,
                        language: $scope.language }, function (response) {
                    $scope.tags = response.result;
                })
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
                $scope.topTagsPromise = MobbrKeywords.get({
                    limit: $scope.tagsLimiter,
                    language: language
                }, function (response) {
                    $scope.tags = response.result;
                    filterTags();
                });
            }

            $scope.resetTopTags = function () {
                $scope.topTagsPromise.$get({ limit: $scope.tagsLimiter, language: $scope.language }, function (response) {
                    $scope.tags = response.result;
                })
                return true;
            }

            $scope.$watch('tags', function () {
                if ($scope.tags !== undefined && $scope.tags !== null) {
                    filterTags();
                }
            }, true);

            $scope.tagsLimiter = 20;

            $scope.$on('mobbrApi:authchange', function () {
                $scope.resetTags($scope.tagsLimiter);
            });

            $scope.$on('language-update', function (event, new_language) {
                if (new_language !== language) {
                    language = new_language;
                    $scope.language = language;
                }
            }, true);
        }
    };
});