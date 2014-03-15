'use strict';

angular.module('mobbr.directives').directive('invoicetable', function factory() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: '../../views/directives/invoicetable.html',
        scope: {
            data: '='
        },
        controller: function ($scope, $attrs, $filter, ngTableParams, PaymentReceipt, userSession, Working, Sourcing) {

            var date = new Date(),
                Api = $attrs.data === 'sourcing' ? Sourcing : Working;

            $scope.invoiceParams = new ngTableParams(
                {
                    page: 1,
                    count: 0
                },
                {
                    counts: [],
                    groupBy: 'uri',
                    total: 0,
                    getData: function ($defer, params) {
                        Api.getOverviewSender({ month: parseInt($scope.selectdate.month) + 1, year: $scope.selectdate.year }, function (response) {

                            var data = response.result,
                                orderedData = params.sorting() ? $filter('orderBy')(data, $scope.invoiceParams.orderBy()) : data;

                            $scope.invoiceParams.$params.count = data.length;
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
        }
    }
});