'use strict';

angular.module('mobbr.services.pdf', []).factory('pdfGenerator', function (userSession, $rootScope) {

        return {
            generate: function (invoice) {

                var pdf = new jsPDF('p','mm', 'a4', true),
                    data = {
                        contractor: {
                            html: '<ul style="font-family: Helvetica"> \
                            <li><strong>' + invoice.customer_name + '</strong></li> \
                            <li>' + invoice.customer_address + '</li> \
                            <li>' + $rootScope.countriesMap[invoice.customer_country] + '</li> \
                        </ul>',
                            width: 70,
                            position: {
                                x: 145,
                                y: 10
                            }
                        },
                        contractor_vat: {
                            html: '<ul style="font-family: Helvetica"> \
                                <li><strong>VAT: </strong>' + invoice.customer_vat_number + '</li> \
                                <li><strong>Mobbr: </strong>' + invoice.customer_username + '</li> \
                            </ul>',
                            width: 70,
                            position: {
                                x: 145,
                                y: 31
                            }
                        },
                        sourcer: {
                            html: '<ul style="font-family: Helvetica"> \
                            <li>' + invoice.worker_name + '</li> \
                            <li>' + invoice.worker_address + '</li> \
                            <li>' + $rootScope.countriesMap[invoice.customer_country] + '</li> \
                        </ul>',
                            width: 70,
                            position: {
                                x: 10,
                                y: 75
                            }
                        },
                        sourceraccount: {
                            html: '<ul style="font-family: Helvetica"> \
                            <li><strong>Mobbr: </strong>' + invoice.worker_username + '</li> \
                        </ul>',
                            width: 70,
                            position: {
                                x: 10,
                                y: 91
                            }
                        },
                        detaillabel: {
                            html: '<small style="font-family: Helvetica"><strong>Task / item</strong></small>',
                            width: 70,
                            position: {
                                x: 10,
                                y: 142
                            }
                        },
                        infolabels: {
                            html: '<ul style="font-family: Helvetica"> \
                            <li> \
                                <strong>Invoice: </strong>' + invoice.invoice_id + ' \
                            </li> \
                            <li> \
                                <strong>Date: </strong>' + invoice.paiddatetime + ' (paid) \
                            </li> \
                        </ul>',
                            width: 70,
                            position: {
                                x: 10,
                                y: 120
                            }
                        },
                        details: {
                            html: '<div style="font-family: Helvetica"> \
                            <strong>' + invoice.description + '</strong> \
                            <div>' + invoice.title + '</div> \
                            <small>' + invoice.uri + '</small> \
                        </div>',
                            width: 190,
                            position: {
                                x: 10,
                                y: 153
                            }
                        },
                        roles: {
                            html: invoice.roles && ('<div style="font-family: Helvetica"><strong>Roles</strong></div><div style="font-family: Helvetica">' + invoice.roles + '</div>') || '',
                            width: 190,
                            position: {
                                x: 10,
                                y: 155
                            }
                        },
                        labels: {
                            html: '<ul style="font-family: Helvetica"> \
                            <li> \
                                <strong>Subtotal</strong> \
                            </li> \
                            <li> \
                                <strong>' + (invoice.vat_rate || '0.00') + '% VAT</strong> \
                            </li> \
                            <li> \
                                <strong>Total</strong> \
                            </li> \
                        </ul>',
                            width: 100,
                            position: {
                                x: 145,
                                y: 174
                            }
                        },
                        totals: {
                            html: '<ul style="font-family: Helvetica"> \
                            <li> \
                                <span>' + invoice.currency_iso + ' ' + invoice.net_amount + '</span> \
                            </li> \
                            <li> \
                                <span>' + invoice.currency_iso + ' ' + (invoice.vat_amount || '0.00') + '</span> \
                            </li> \
                            <li> \
                                <span>' + invoice.currency_iso + ' ' + invoice.amount + '</span> \
                            </li> \
                        </ul>',
                            width: 70,
                            position: {
                                x: 170,
                                y: 174
                            }
                        },
                        reverse: {
                            html: '<span style="font-family: Helvetica">VAT reverse charged, needs to be paid by <strong>`' + invoice.worker_username + '`</strong></span>',
                            width: 210,
                            position: {
                                x: 10,
                                y: 178
                            }
                        },
                        hasbeenpayed: {
                            html: '<small style="font-family: Helvetica">Invoice has already been paid using <strong>Mobbr crowdpayments</strong></small>',
                            width: 210,
                            position: {
                                x: 10,
                                y: 282
                            }
                        }


                    };

                pdf.setFont("helvetica");

                angular.forEach(data, function (element) {
                    pdf.fromHTML(element.html, element.position.x, element.position.y, {
                        width: element.width,
                        elementHandlers: {
                            '#bypassme': function(element, renderer) {
                                return true;
                            }
                        }
                    });
                });

                console.log(invoice);

                pdf.setLineWidth(.1);
                pdf.line(5, 150, 205, 150);
                pdf.line(5, 171, 205, 171);

                pdf.save(invoice.invoice_id);
            }
        }
    }
);
