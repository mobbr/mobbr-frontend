'use strict';

angular.module('mobbr.services').factory('table', function ($state) {

    var $injector = angular.injector(['mobbrSession', 'mobbrApi', 'mobbr.config']),
        table = {
        reset: function (data, state) {
            table.data = data;
            if (table.params) {
                if (state && state.data.sorting !== undefined) {
                    table.sortTableBy(state.data.sorting);
                }
                if (!table.params.settings().$loading) {
                    table.params.reload();
                }
            } else {
                table.data.$promise.then(function () {
                    if (state && state.data.sorting !== undefined) {
                        table.sortTableBy(state.data.sorting);
                    }
                });
            }
        },
        reload: function () {
            var fn = $state.current.resolve.data;
            if (fn['$inject']) {
                fn['$inject'] = $injector.annotate(fn);
            }
            table.data = $injector.invoke(fn);
            table.params.reload();
        },
        params: null,
        data: null,
        sortTableBy: function (column) {
            if (table.params) {

                var sorting;

                if (typeof column === 'object') {
                    sorting = column;
                } else if (column === false) {
                    sorting = column
                } else {
                    sorting = {};
                    sorting[column] = table.params.isSortBy(column, 'asc') ? 'desc' : 'asc';
                }

                table.params.sorting(sorting);
            }
        }
    };

    return table;
});
