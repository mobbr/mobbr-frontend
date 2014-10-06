angular.module('mobbr.controllers').controller('MainController', function ($scope, MobbrApi) {
    'use strict';

    function shuffle(o){ //v1.0
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

    $scope.happening = MobbrApi.happening();

    $scope.happening.$promise.then(function (response) {

        $scope.tags = [];

        angular.forEach(response.result.keywords, function (item) {
            $scope.tags.push({ type: 'keyword', keyword: item.keyword });
        });

        angular.forEach(response.result.payments, function (item) {
            $scope.tags.push({ type: 'payment', amount: item.amount, currency_iso: item.currency_iso });
        });

        angular.forEach(response.result.persons, function (item) {
            $scope.tags.push({ type: 'person', gravatar: item.gravatar });
        });

        shuffle($scope.tags);
    });

//    MobbrUri.get({limit: 4}).$promise.then(function(response){
//        $scope.featuredTasks = response.result;
//    });

});