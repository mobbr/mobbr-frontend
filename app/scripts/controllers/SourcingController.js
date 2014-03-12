'use strict';

angular.module('mobbr.controllers').controller('SourcingController', function ($scope, $filter, ngTableParams) {

    var date = new Date(),
        data = [
            {
                id: 1,
                uri: 'http://nu.nl/stom-artikel',
                description: 'Hier een stomme omschrijving',
                img_uri: 'http://www.nu.nl/images/logo_nu_nl.gif',
                paiddatetime: '2013-12-13',
                contractor: 'Moroni',
                currency_iso: 'EUR',
                firstname: 'Moroni',
                lastname: 'Jansen',
                address: 'Pathmossingel 98',
                country_of_residence: 'NL',
                vat_number: '1234567890',
                gravatar: '',
                amount: 450,
                roles: [
                    {
                        role: 'Developer',
                        amount: 100
                    },
                    {
                        role: 'Editor',
                        amount: 50
                    },
                    {
                        role: 'Chauffeur',
                        amount: 300
                    }
                ]
            },
            {
                id: 2,
                uri: 'http://nu.nl/nog-een-stom-artikel',
                description: 'Hier een nog stommere omschrijving',
                img_uri: 'http://www.nu.nl/images/logo_nu_nl.gif',
                paiddatetime: '2014-02-03',
                contractor: 'Bert64',
                currency_iso: 'EUR',
                firstname: 'Bert',
                lastname: 'Kuipers',
                address: 'Zomaarstraat 103',
                country_of_residence: 'NL',
                vat_number: '1234567890',
                amount: 450,
                gravatar: '',
                roles: [
                    {
                        role: 'Developer',
                        amount: 100
                    },
                    {
                        role: 'Editor',
                        amount: 50
                    },
                    {
                        role: 'Chauffeur',
                        amount: 300
                    }
                ]
            },
            {
                id: 3,
                uri: 'http://nu.nl/stom-artikel',
                description: 'Hier een stomme omschrijving',
                img_uri: 'http://www.nu.nl/images/logo_nu_nl.gif',
                paiddatetime: '2014-02-03',
                contractor: 'Bert64',
                currency_iso: 'EUR',
                firstname: 'Bert',
                lastname: 'Kuipers',
                address: 'Zomaarstraat 103',
                country_of_residence: 'NL',
                vat_number: '1234567890',
                amount: 450,
                gravatar: '',
                roles: [
                    {
                        role: 'Developer',
                        amount: 100
                    },
                    {
                        role: 'Editor',
                        amount: 50
                    },
                    {
                        role: 'Chauffeur',
                        amount: 300
                    }
                ]
            }
        ];

    $scope.invoiceParams = new ngTableParams(
        {
            page: 1,
            count: data.length
        },
        {
            groupBy: 'uri',
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
        $scope.invoices = [];
        angular.forEach($scope.users, function (item) {
            if ($scope.checkboxes.items[item.id]) {
                $scope.invoices.push(item);
            }
        });
    }

    // watch the selected date, we need to reload the data on this
    $scope.$watch('selectdate', function (oldvalue, newvalue) {
        // we refresh the data here
    }, true);

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

    $scope.checkboxes = { 'checked': false, items: {} };
    $scope.numselected = 0;
    $scope.selectdate = {};
    $scope.selectdate.month = date.getMonth();
    $scope.selectdate.year = date.getFullYear();
});