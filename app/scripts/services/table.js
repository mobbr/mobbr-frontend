'use strict';

angular.module('mobbr.services').factory('table', function () {

    return {
        reload: function (data) {
            this.data = data;
            if (this.tableParams  && !this.tableParams.settings().$loading) {
                this.tableParams.reload();
            }
        },
        tableParams: null,
        data: null
    };
});
