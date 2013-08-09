'use strict';

angular.module('mobbr.controllers').controller('MainController', function ($scope) {

    $scope.openUrl = function(url){
        if(url){
            document.location = url;
        }
    }

});