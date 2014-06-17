'use strict';

angular.module('mobbr.services').factory('mobbrModal', function ($modal) {

    var modal;

    return {
        open: function (config) {
            modal = $modal.open(config);
            return modal;
        },
        close: function () {
            if (modal) {
                modal.dismiss();
            }
        }
    }
});
