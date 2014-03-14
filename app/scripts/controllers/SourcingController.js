'use strict';

angular.module('mobbr.controllers').controller('SourcingController', function ($scope, $filter, $http, $templateCache, $controller, $compile, $timeout, ngTableParams, PaymentReceipt) {

    var element,
        template,
        date = new Date(),
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

    // we get the invoice template
    $http.get('views/invoice.html', { cache: $templateCache }).then(function (response) {
        template = response.data;
    });

    $scope.invoiceParams = new ngTableParams(
        {
            page: 1,
            count: data.length
        },
        {
            counts: [],
            groupBy: 'uri',
            total: data.length,
            getData: function ($defer, params) {
                PaymentReceipt.getOverviewSender({ month: parseInt($scope.selectdate.month) + 1, year: $scope.selectdate.year }, function (response) {

                    var data = response.result,
                        orderedData = params.sorting() ? $filter('orderBy')(data, $scope.invoiceParams.orderBy()) : data;

                    $defer.resolve($scope.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                });


            }
        }
    );

    $scope.generateInvoices = function () {

        var invoices = [],
            i = 0,
            l;

        function generatePDF() {

            var item = invoices[i],
                templateScope = $scope.$new(),
                pdf = new jsPDF('p','mm', 'a4', true);

            if (!element) {
                element = angular.element(document.getElementById('invoice'));
            }

            i++;
            templateScope.invoice = item;
            element.html(template);
            $compile(element.contents())(templateScope);

            // we use this timeout to make sure the element is compiled, it's stupid, i know
            $timeout(function () {
                pdf.fromHTML(element.get(0), 20, 20, {
                    width: 210,
                    elementHandlers: {
                        '#bypassme': function(element, renderer) {
                            return true;
                        }
                    }
                });
                pdf.save(item.id);
                element.html('');
            });

            // call the next pdf recursivly, we need to do this because else all pdf's will have only the first pdf content
            if (i < l) {
                $timeout(generatePDF);
            }
        }

        // push all selected invoices to the array
        angular.forEach($scope.users, function (item) {
            if ($scope.checkboxes.items[item.id]) {
                invoices.push(item);
            }
        });

        l = invoices.length;
        generatePDF();
    }

    // watch the selected date, we need to reload the data on this
    $scope.$watch('selectdate', function (oldvalue, newvalue) {
        if (oldvalue !== newvalue) {
            $scope.invoiceParams.reload();
        }
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