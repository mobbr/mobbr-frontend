'use strict';

angular.module('mobbr.directives').directive('placeholder', function ($timeout) {
    var i = document.createElement('input');
    if ('placeholder' in i) {
        return {}
    }
    return {
        link: function(scope, elm, attrs){
            if (attrs.type === 'password') {
                return;
            }
            $timeout(function(){
                elm.val(attrs.placeholder);
                elm.bind('focus', function () {
                    if (elm.val() == attrs.placeholder) {
                        elm.val('');
                    }
                }).bind('blur', function () {
                        if (elm.val() == '') {
                            elm.val(attrs.placeholder);
                        }
                    }
                );
            });
        }
    }
});