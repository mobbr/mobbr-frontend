'use strict';

angular.module('mobbr.controllers').controller('SourcingController', function ($scope, $filter, ngTableParams) {

    var date = new Date(),
        data = [
            { id: 1, name: "Moroni", amount: 50, url: 'http://nu.nl' },
            { id: 2, name: "Tiancum", amount: 43, url: 'http://whatfoodcando.com' },
            { id: 3, name: "Jacob", amount: 27, url: 'http://nu.nl' },
            { id: 4, name: "Nephi", amount: 29, url: 'http://whatfoodcando.com' },
            { id: 5, name: "Enos", amount: 34, url: 'http://zaplog.nl' },
            { id: 6, name: "Henk", amount: 43, url: 'http://zaplog.nl' },
            { id: 7, name: "Bert", amount: 27, url: 'http://zaplog.nl' },
            { id: 8, name: "Barry", amount: 29, url: 'http://nu.nl' },
            { id: 9, name: "Ronny", amount: 34, url: 'http://nu.nl' },
            { id: 10, name: "Darth Vader", amount: 43, url: 'http://zaplog.nl' },
            { id: 11, name: "Obi Wan Kenobi", amount: 27, url: 'http://zaplog.nl' },
            { id: 12, name: "Arno", amount: 29, url: 'http://whatfoodcando.com' },
            { id: 13, name: "Achmed", amount: 34, url: 'http://whatfoodcando.com' },
            { id: 14, name: "Mohammed", amount: 43, url: 'http://zaplog.nl' },
            { id: 15, name: "Jan", amount: 27, url: 'http://nu.nl' },
            { id: 16, name: "Kees", amount: 29, url: 'http://nu.nl' },
            { id: 17, name: "Han", amount: 34, url: 'http://nu.nl' }
        ];

    $scope.invoiceParams = new ngTableParams(
        {
            page: 1,
            count: data.length
        },
        {
            groupBy: 'url',
            total: data.length,
            getData: function ($defer, params) {

                var orderedData = params.sorting() ?
                    $filter('orderBy')(data, $scope.invoiceParams.orderBy()) :
                    data;

                $defer.resolve($scope.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        }
    );


    $scope.generateInvoices = function () {
        alert('we are generating invoices for ' + $scope.numselected + ' records');
    }

    // watch for check all checkbox
    $scope.$watch('checkboxes.checked', function (value) {
        angular.forEach($scope.users, function (item) {
            $scope.checkboxes.items[item.id] = value;
        });
    });

    // watch for data checkboxes
    $scope.$watch('checkboxes.items', function (values) {

        if (!$scope.users) {
            return;
        }

        var checked = 0,
            unchecked = 0,
            total = $scope.users.length;

        angular.forEach($scope.users, function (item) {
            checked += ($scope.checkboxes.items[item.id]) || 0;
            unchecked += (!$scope.checkboxes.items[item.id]) || 0;
        });

        if ((unchecked == 0) || (checked == 0)) {
            $scope.checkboxes.checked = (checked == total);
        }

        $scope.numselected = checked;
        angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
    }, true);

    // watch the selected date, we need to reload the data on this
    $scope.$watch('selectdate', function (oldvalue, newvalue) {
        console.log('we refresh the data here');
    }, true);

    $scope.checkboxes = { 'checked': false, items: {} };
    $scope.numselected = 0;
    $scope.selectdate = {};
    $scope.selectdate.month = date.getMonth();
    $scope.selectdate.year = date.getFullYear();
});