'use strict';

angular.module('mobbr.directives').directive('invoicetable', function factory() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: '../../views/directives/invoicetable.html',
        scope: {
            data: '=',
            action: '=',
            buttonText: '='
        },
        controller: function ($scope, $attrs, $filter, $dialog, ngTableParams, PaymentReceipt, userSession, Working, Sourcing) {

            var Api = $attrs.data === 'sourcing' ? Sourcing : Working,
                d = $dialog.dialog({
                    backdrop: true,
                    keyboard: true,
                    backdropClick: false,
                    templateUrl: 'views/partials/invoice_popup.html',
                    controller: function ($scope, dialog) {

                        $scope.invoice = {
                            name: userSession.user.companyname || (userSession.user.firstname + ' ' + userSession.user.lastname),
                            address: userSession.user.address,
                            country: userSession.user.country_of_residence,
                            vat_number: userSession.user.vat_number,
                            vat_rate: userSession.user.vat_rate,
                            status: userSession.user.companyname && 'enterprise' || 'private'
                        }

                        $scope.close = function () {
                            dialog.close();
                        }

                        $scope.confirm = function () {

                            var params = $scope.invoice,
                                req_params = {},
                                prefix =  $attrs.data === 'sourcing' ? 'customer' : 'worker';

                            angular.forEach(params, function (item, key) {
                                req_params[prefix + '_' + key] = item;
                            });

                            req_params.ids = getIds();
                            Sourcing.requestInvoices(req_params, function () {
                                dialog.close();
                            });
                        }
                    }
                });

            function getIds() {

                var ids = [];

                angular.forEach($scope.users, function (item) {
                    if ($scope.checkboxes.items[item.id]) {
                        ids.push(item.id);
                    }
                });

                return ids;
            }

            $scope.buttonAction = function () {
                switch($scope.action) {
                    case 'requested':
                        Sourcing.cancelInvoices({ ids: getIds() });
                        break;
                    case 'unrequested':
                        d.open();
                        break;
                }
            }

            $scope.userSession = userSession;
            $scope.empty_message = $attrs.emptyMessage || 'No invoices available for the selected timeframe';
            $scope.invoiceParams = new ngTableParams(
                {
                    page: 1,
                    count: 0
                },
                {
                    counts: [],
                    groupBy: 'title',
                    total: 0,
                    getData: function ($defer, params) {

                        Api.invoices({ action: $scope.action + '_invoices' }, function (response) {

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
                            <span>' + invoice.id + '</span> \
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

                pdf.save(invoice.id);

            }

            $scope.generateInvoices = function () {

                angular.forEach($scope.users, function (item) {
                    if ($scope.checkboxes.items[item.id]) {
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
        }
    }
});