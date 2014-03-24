'use strict';

angular.module('mobbr.services.pdf', []).factory('pdfGenerator', function (userSession) {

        return {
            generate: function (invoice) {

                console.log(invoice);

                var pdf = new jsPDF('p','mm', 'a4', true),
                    data = {
                        contractor: {
                            html: '<ul style="font-family: Helvetica"> \
                            <li><strong>' + invoice.customer_name + '</strong></li> \
                            <li>' + invoice.customer_username + '</li> \
                            <li>' + invoice.customer_address + '</li> \
                            <li>' + invoice.customer_country + '</li> \
                        </ul>',
                            width: 70,
                            position: {
                                x: 145,
                                y: 10
                            }
                        },
                        contractor_vat: {
                            html: '<ul style="font-family: Helvetica"> \
                                <li><strong>VAT number</strong></li> \
                                <li>' + invoice.customer_vat_number + '</li> \
                            </ul>',
                            width: 70,
                            position: {
                                x: 145,
                                y: 31
                            }
                        },
                        sourcer: {
                            html: '<ul style="font-family: Helvetica"> \
                            <li><strong>' + invoice.worker_name + '</strong></li> \
                            <li>' + invoice.worker_username + '</li> \
                            <li>' + invoice.worker_address + '</li> \
                            <li>' + invoice.worker_country + '</li> \
                        </ul>',
                            width: 70,
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
                            width: 70,
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
                            width: 100,
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
                            width: 190,
                            position: {
                                x: 10,
                                y: 133
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
                            width: 100,
                            position: {
                                x: 145,
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
                            width: 70,
                            position: {
                                x: 170,
                                y: 205
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

                pdf.save(invoice.id);
            }
        }
    }
);
