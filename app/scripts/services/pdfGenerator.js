'use strict';

angular.module('mobbr.services.pdf', []).factory('pdfGenerator', function (userSession, $rootScope) {

        return {
            generate: function (invoice) {

                var pdf = new jsPDF('p','mm', 'a4', true),
                    marginVertical = 10,
                    marginHorizontal = 5,
                    lineHeight = marginVertical;

                function textSize(text) {
                    return pdf.getStringUnitWidth(text) * pdf.internal.getFontSize() / pdf.internal.scaleFactor
                }

                function singlelineText(text, x, y) {
                    pdf.text(text, x, y);
                    return pdf.internal.getFontSize() / pdf.internal.scaleFactor;
                }

                function multilineText(text, x, y, width) {

                    var strline = '',
                        lineWidth = 0,
                        totalHeight = 0;

                    angular.forEach(text, function (part) {
                        lineWidth += textSize(part);
                        if (lineWidth > width) {
                            totalHeight += singlelineText(strline, x, y + totalHeight);
                            strline = '';
                            lineWidth = 0;
                        }
                        strline += part;
                    });

                    totalHeight += singlelineText(strline, x, y + totalHeight);
                    return totalHeight;
                }

                function alignRight(text) {
                    return pdf.internal.pageSize.width - textSize(text) - marginHorizontal;
                }

                var customer_address = invoice.customer_address.split(', '),
                    worker_address = invoice.worker_address.split(', '),
                    descr_lines,
                    textWidth,
                    i;

                pdf.setFont('Helvetica', 'Bold');
                pdf.setFontSize(80);
                pdf.setTextColor(200, 200, 200);
                pdf.text('PAYED', 65, 180, {}, 30);
                pdf.setTextColor(0, 0, 0);
                pdf.setFontSize(14);
                lineHeight += singlelineText(invoice.customer_name, alignRight(invoice.customer_name), lineHeight);
                pdf.setFont('Helvetica', '');
                pdf.setFontSize(10);
                for (i = 0; i < customer_address.length; i++) {
                    lineHeight += singlelineText(customer_address[i], alignRight(customer_address[i]), lineHeight);
                }
                lineHeight += singlelineText($rootScope.countriesMap[invoice.customer_country], alignRight($rootScope.countriesMap[invoice.customer_country]), lineHeight);
                lineHeight += singlelineText(invoice.customer_vat_number, alignRight(invoice.customer_vat_number), lineHeight);
                singlelineText(' ' + invoice.customer_username, alignRight(' ' + invoice.customer_username), lineHeight);
                textWidth = textSize(invoice.customer_username);
                pdf.setFont('Helvetica', 'Bold');
                lineHeight += singlelineText('Mobbr', alignRight(invoice.customer_username) - textWidth, lineHeight);
                pdf.setFont('Helvetica', '');
                lineHeight += singlelineText(invoice.worker_name, marginHorizontal, lineHeight, 200);
                for (i = 0; i < worker_address.length; i++) {
                    lineHeight += singlelineText(worker_address[i], marginHorizontal, lineHeight);
                }
                lineHeight += singlelineText($rootScope.countriesMap[invoice.worker_country], 5, lineHeight);
                lineHeight += singlelineText(invoice.worker_vat_number, marginHorizontal, lineHeight);
                pdf.setFont('Helvetica', 'Bold');
                singlelineText('Mobbr ', marginHorizontal, lineHeight);
                textWidth = textSize('Mobbr ');
                pdf.setFont('Helvetica', '');
                lineHeight += singlelineText(invoice.worker_username, marginHorizontal + textWidth, lineHeight);
                lineHeight += 50;
                pdf.setFont('Helvetica', 'Bold');
                singlelineText('Invoice ID ', marginHorizontal, lineHeight);
                textWidth = textSize('Invoice ID ');
                pdf.setFont('Helvetica', '');
                lineHeight += singlelineText(invoice.invoice_id, marginHorizontal + textWidth, lineHeight);
                pdf.setFont('Helvetica', 'Bold');
                singlelineText('Invoice date/time (paid) ', marginHorizontal, lineHeight);
                textWidth = textSize('Invoice date/time (paid) ');
                pdf.setFont('Helvetica', '');
                lineHeight += singlelineText(invoice.paiddatetime, marginHorizontal + textWidth, lineHeight);
                lineHeight += 20;
                pdf.setFont('Helvetica', 'Bold');
                pdf.setLineWidth(.1);
                lineHeight += singlelineText('TASK / ITEM', marginHorizontal, lineHeight);
                pdf.line(marginHorizontal, lineHeight, pdf.internal.pageSize.width - marginHorizontal, lineHeight);
                lineHeight += 7;
                pdf.setFont('Helvetica', 'Bold');
                pdf.setFontSize(14);
                lineHeight += singlelineText(invoice.title, marginHorizontal, lineHeight);
                pdf.setFont('Helvetica', '');
                pdf.setFontSize(10);
                descr_lines = pdf.splitTextToSize(invoice.description, 200);
                for (i = 0; i < descr_lines.length; i++) {
                    lineHeight += singlelineText(descr_lines[i], marginHorizontal, lineHeight);
                }
                pdf.setFont('Helvetica', 'Oblique');
                lineHeight += singlelineText(invoice.uri, marginHorizontal, lineHeight);
                pdf.setFont('Helvetica', 'Bold');
                singlelineText('Role ', marginHorizontal, lineHeight);
                textWidth = textSize('Role ');
                pdf.setFont('Helvetica', '');
                lineHeight += singlelineText(invoice.role, marginHorizontal + textWidth, lineHeight);
                pdf.line(marginHorizontal, lineHeight, pdf.internal.pageSize.width - marginHorizontal, lineHeight);
                lineHeight += 7;
                singlelineText(invoice.currency_iso + ' ' + invoice.net_amount, alignRight(invoice.currency_iso + ' ' + invoice.net_amount), lineHeight);
                pdf.setFont('Helvetica', 'Bold');
                lineHeight += singlelineText('Subtotal', pdf.internal.pageSize.width - 80, lineHeight);
                lineHeight += singlelineText('VAT reverse charged', pdf.internal.pageSize.width - 80, lineHeight);
                pdf.setFont('Helvetica', '');
                singlelineText(invoice.currency_iso + ' ' + invoice.amount, alignRight(invoice.currency_iso + ' ' + invoice.amount), lineHeight);
                pdf.setFont('Helvetica', 'Bold');
                singlelineText('Total ',  pdf.internal.pageSize.width - 80, lineHeight);
                pdf.setFont('Helvetica', '');
                pdf.save(invoice.invoice_id);

                console.log();
            }
        }
    }
);
