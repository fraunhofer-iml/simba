/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { InvoiceZugferdEntity } from './invoice-zugferd.entity';

export function invoiceTemplate(params: InvoiceZugferdEntity): jsPDF {
  const doc = new jsPDF();
  const docWidth = doc.internal.pageSize.width;
  const docHeight = doc.internal.pageSize.height;

  const colorBlack = '#000000';
  const colorGray = '#4d4e53';
  let currentHeight = 15;

  const pdfConfig = {
    headerTextSize: 20,
    labelTextSize: 12,
    fieldTextSize: 10,
    lineHeight: 6,
    subLineHeight: 4,
  };

  doc.setFontSize(pdfConfig.headerTextSize);
  doc.setTextColor(colorBlack);
  doc.text('INVOICE', 10, currentHeight, { align: 'left' });
  doc.setFontSize(pdfConfig.fieldTextSize);

  doc.setTextColor(colorGray);
  doc.text(params.supplier.name, docWidth - 10, currentHeight, {
    align: 'right',
  });

  currentHeight += pdfConfig.subLineHeight;
  doc.text(params.supplier.addressStreet, docWidth - 10, currentHeight, {
    align: 'right',
  });

  currentHeight += pdfConfig.subLineHeight;
  doc.text(`${params.supplier.addressZip} ${params.supplier.addressCity}`, docWidth - 10, currentHeight, {
    align: 'right',
  });

  currentHeight += pdfConfig.subLineHeight * 2;
  doc.text(`Phone: ${params.supplier.phone}`, docWidth - 10, currentHeight, {
    align: 'right',
  });

  currentHeight += pdfConfig.subLineHeight;
  doc.text(`E-Mail: ${params.supplier.email}`, docWidth - 10, currentHeight, {
    align: 'right',
  });

  currentHeight += pdfConfig.subLineHeight;
  // Line break after business info
  doc.line(10, currentHeight, docWidth - 10, currentHeight);

  currentHeight += pdfConfig.subLineHeight * 2;
  // Contract
  doc.setTextColor(colorBlack);
  doc.text(params.buyer.name, 10, currentHeight);
  doc.text(`Invoice No.: ${params.invoice.reference}`, docWidth - 10, currentHeight, { align: 'right' });

  currentHeight += pdfConfig.subLineHeight;
  doc.text(params.buyer.addressStreet, 10, currentHeight);
  doc.text(`Invoice Date: ${params.invoice.date.toLocaleDateString('de-DE')}`, docWidth - 10, currentHeight, { align: 'right' });

  currentHeight += pdfConfig.subLineHeight;
  doc.text(`${params.buyer.addressZip} ${params.buyer.addressCity}`, 10, currentHeight);
  doc.text(`Order No.: ${params.invoice.contractReference}`, docWidth - 10, currentHeight, { align: 'right' });

  currentHeight += pdfConfig.subLineHeight;
  currentHeight += pdfConfig.subLineHeight;

  currentHeight += pdfConfig.lineHeight * 2;
  const itemsArray = params.items.map((item) => [
    { content: item.articleName, styles: { halign: 'right' } },
    { content: item.articleNumber, styles: { halign: 'right' } },
    { content: item.quantity, styles: { halign: 'right' } },
    { content: item.currency, styles: { halign: 'right' } },
    { content: Number(item.unitPrice).toFixed(2), styles: { halign: 'right' } },
    {
      content: Number(item.totalAmountNet).toFixed(2),
      styles: { halign: 'right' },
    },
  ]);

  // Table
  autoTable(doc, {
    head: [
      [
        { content: 'Article', styles: { halign: 'center' } },
        { content: 'Article No.', styles: { halign: 'center' } },
        { content: 'Quantity', styles: { halign: 'center' } },
        { content: 'Currency', styles: { halign: 'center' } },
        { content: 'Unit Price', styles: { halign: 'center' } },
        { content: 'Total Amount (net)', styles: { halign: 'center' } },
      ],
    ],
    body: [
      ...(itemsArray as RowInput[]),
      [
        {
          colSpan: 4,
          content: 'VAT',
          styles: {
            halign: 'right',
          },
        },
        { content: `${params.additional.vat}%`, styles: { halign: 'right' } },
        {
          content: (params.invoice.totalAmountGross - params.invoice.totalAmountNet).toFixed(2),
          styles: { halign: 'right' },
        },
      ],
      [
        {
          colSpan: 5,
          content: `Total Invoice Amount in ${params.items[0].currency} incl. VAT`,
          styles: {
            halign: 'right',
            fontStyle: 'bold',
          },
        },
        { content: params.invoice.totalAmountGross.toFixed(2), styles: { halign: 'right' } },
      ],
    ],
    bodyStyles: {
      fillColor: '#ECECED',
    },
    startY: currentHeight,
    margin: 10,
  });

  currentHeight += pdfConfig.lineHeight * 8;
  doc.line(10, currentHeight, docWidth - 10, currentHeight);

  currentHeight += pdfConfig.subLineHeight;
  doc.text(`Invoice Date to be considered as delivery date.`, 10, currentHeight);

  currentHeight += pdfConfig.subLineHeight;
  doc.text(`Payment of the total invoice amount has to be made to the account of ${params.supplier.name}`, 10, currentHeight);

  currentHeight += pdfConfig.subLineHeight;
  doc.text(`${params.additional.paymentTerms}`, 10, currentHeight);

  currentHeight += pdfConfig.subLineHeight / 2;
  doc.line(10, currentHeight, docWidth - 10, currentHeight);

  doc.text(`Bank Account: IBAN ${params.supplier.iban}`, docWidth / 2, docHeight - 10, {
    align: 'center',
  });

  doc.text(`Trade Register Number: ${params.supplier.tradeRegisterNumber}`, docWidth / 2, docHeight - (10 + pdfConfig.subLineHeight), {
    align: 'center',
  });

  doc.text(`Tax Identification Number: ${params.supplier.taxIdentifier}`, docWidth / 2, docHeight - (10 + pdfConfig.subLineHeight * 2), {
    align: 'center',
  });

  doc.text(`${params.supplier.name}`, docWidth / 2, docHeight - (10 + pdfConfig.subLineHeight * 3), {
    align: 'center',
  });

  doc.line(10, docHeight - (10 + pdfConfig.subLineHeight * 5), docWidth - 10, docHeight - (10 + pdfConfig.subLineHeight * 5));

  return doc;
}
