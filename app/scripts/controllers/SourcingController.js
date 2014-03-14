'use strict';

angular.module('mobbr.controllers').controller('SourcingController', function ($scope, $filter, $http, $templateCache, $controller, $compile, $timeout, ngTableParams, PaymentReceipt, userSession) {

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

                    console.log(data);

                    $defer.resolve($scope.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                });


            }
        }
    );

    function generatePDF(invoice) {

        var pdf = new jsPDF('p','mm', 'a4', true),
            data = {
                contractor: {
                    html: '<ul style="font-family: Helvetica"> \
                        <li><strong>' + invoice.contractor + '</strong></li> \
                        <li>' + invoice.firstname + ' ' + invoice.lastname + '</li> \
                        <li>' + invoice.address + '</li> \
                        <li>' + invoice.country_of_residence + '</li> \
                    </ul>',
                    position: {
                        x: 160,
                        y: 10
                    }
                },
                contractor_vat: {
                    html: '<ul style="font-family: Helvetica"> \
                            <li><strong>VAT number</strong></li> \
                            <li>' + invoice.vat_number + '</li> \
                        </ul>',
                    position: {
                        x: 160,
                        y: 31
                    }
                },
                sourcer: {
                    html: '<ul style="font-family: Helvetica"> \
                        <li><strong>' + userSession.user.username + '</strong></li> \
                        <li>' + userSession.user.firstname + ' ' + userSession.user.lastname + '</li> \
                        <li>' + userSession.user.address + '</li> \
                        <li>' + userSession.user.country_of_residence + '</li> \
                    </ul>',
                    position: {
                        x: 10,
                        y: 55
                    }
                },
                infolabels: {
                    html: '<ul style="font-family: Helvetica"> \
                        <li> \
                            <strong>Invoice ID</strong> \
                        </li> \
                        <li> \
                            <strong>Invoice date</strong> \
                        </li> \
                    </ul>',
                    position: {
                        x: 10,
                        y: 120
                    }
                },
                infodata: {
                    html: '<ul style="font-family: Helvetica"> \
                        <li> \
                            <span>' + invoice.invoice_id + '</span> \
                        </li> \
                        <li> \
                            <span>' + invoice.paiddatetime + '</span> \
                        </li> \
                    </ul>',
                    position: {
                        x: 40,
                        y: 120
                    }
                },
                details: {
                    html: '<div style="font-family: Helvetica"> \
                        <h2>' + invoice.description + '</h1> \
                        <h3>' + invoice.uri + '</h2> \
                    </div>',
                    position: {
                        x: 10,
                        y: 133
                    }
                },
                roles: {
                    html: invoice.roles && ('<div style="font-family: Helvetica"><strong>Roles</strong></div><div style="font-family: Helvetica">' + invoice.roles + '</div>') || '',
                    position: {
                        x: 10,
                        y: 155
                    }
                },
                labels: {
                    html: '<ul style="font-family: Helvetica"> \
                        <li> \
                            <strong>Subtotal</strong> \
                        </li>' +
                        (
                            invoice.vat_number &&
                            '<li> \
                                <strong>' + invoice.vat_rate + '% VAT</strong> \
                            </li>' || ''
                        ) +
                        '<li> \
                            <strong>Total</strong> \
                        </li> \
                    </ul>',
                    position: {
                        x: 135,
                        y: 205
                    }
                },
                totals: {
                    html: '<ul style="font-family: Helvetica"> \
                        <li> \
                            <span>' + invoice.currency_iso + ' ' + invoice.net_amount + '</span> \
                        </li>' +
                        (
                            invoice.vat_number &&
                            '<li> \
                                <span>' + invoice.currency_iso + ' ' + invoice.vat_amount + '</span> \
                            </li>' || ''
                            ) +
                        '<li> \
                            <span>' + invoice.currency_iso + ' ' + invoice.amount + '</span> \
                        </li> \
                    </ul>',
                    position: {
                        x: 160,
                        y: 205
                    }
                }
            };

        pdf.setFont("helvetica");

        angular.forEach(data, function (element) {
            pdf.fromHTML(element.html, element.position.x, element.position.y, {
                width: 210,
                elementHandlers: {
                    '#bypassme': function(element, renderer) {
                        return true;
                    }
                }
             });
        });

        pdf.save(invoice.invoice_id);

    }

    $scope.generateInvoices = function () {

        angular.forEach($scope.users, function (item) {
            if ($scope.checkboxes.items[item.invoice_id]) {
                generatePDF(item);
            }
        });
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
            $scope.checkboxes.items[item.invoice_id] = value;
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
            checked += ($scope.checkboxes.items[item.invoice_id]) || 0;
            unchecked += (!$scope.checkboxes.items[item.invoice_id]) || 0;
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