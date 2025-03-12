/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { InvoiceZugferdEntity } from './invoice-zugferd.entity';

export const zugferdTemplate = (params: InvoiceZugferdEntity) => {
  return {
    'rsm:CrossIndustryInvoice': {
      '@_xmlns:rsm': 'urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100',
      '@_xmlns:qdt': 'urn:un:unece:uncefact:data:standard:QualifiedDataType:100',
      '@_xmlns:ram': 'urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100',
      '@_xmlns:udt': 'urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100',
      '@_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'rsm:ExchangedDocumentContext': {
        'ram:GuidelineSpecifiedDocumentContextParameter': {
          'ram:ID': 'urn:cen.eu:en16931:2017#conformant#urn:factur-x.eu:1p0:extended',
        },
      },
      'rsm:ExchangedDocument': {
        'ram:ID': params.invoice.reference,
        'ram:IssueDateTime': {
          'udt:DateTimeString': {
            '@_format': '102',
            '#text': params.invoice.date.toLocaleDateString('en-EN'),
          },
        },
      },
      'rsm:SupplyChainTradeTransaction': {
        'ram:IncludedSupplyChainTradeLineItem': {
          'ram:AssociatedDocumentLineDocument': {
            'ram:LineID': '1',
          },
          'ram:SpecifiedTradeProduct': {
            'ram:Name': params.items[0].articleName,
          },
          'ram:SpecifiedLineTradeAgreement': {
            'ram:NetPriceProductTradePrice': {
              'ram:ChargeAmount': params.items[0].unitPrice,
            },
          },
          'ram:SpecifiedLineTradeDelivery': {
            'ram:BilledQuantity': {
              '@_unitCode': 'SEC',
              '#text': params.items[0].quantity,
            },
          },
          'ram:SpecifiedLineTradeSettlement': {
            'ram:ApplicableTradeTax': {
              'ram:TypeCode': 'VAT',
              'ram:RateApplicablePercent': params.additional.vat,
            },
            'ram:SpecifiedTradeSettlementLineMonetarySummation': {
              'ram:LineTotalAmount': params.items[0].totalAmountNet,
            },
          },
        },
        'ram:ApplicableHeaderTradeAgreement': {
          'ram:SellerTradeParty': {
            'ram:Name': params.supplier.name,
            'ram:PostalTradeAddress': {
              'ram:PostcodeCode': params.supplier.addressZip,
              'ram:LineOne': params.supplier.addressStreet,
              'ram:CityName': params.supplier.addressCity,
              'ram:CountryID': params.supplier.countryCode,
            },
          },
          'ram:BuyerTradeParty': {
            'ram:Name': params.buyer.name,
            'ram:PostalTradeAddress': {
              'ram:PostcodeCode': params.buyer.addressZip,
              'ram:LineOne': params.buyer.addressStreet,
              'ram:CityName': params.buyer.addressCity,
              'ram:CountryID': params.buyer.countryCode,
            },
          },
        },
        'ram:ApplicableHeaderTradeDelivery': {
          'ram:ShipToTradeParty': {
            'ram:Name': params.buyer.name,
            'ram:PostalTradeAddress': {
              'ram:PostcodeCode': params.buyer.addressZip,
              'ram:LineOne': params.buyer.addressStreet,
              'ram:CityName': params.buyer.addressCity,
              'ram:CountryID': params.buyer.countryCode,
            },
          },
          'ram:ActualDeliverySupplyChainEvent': {
            'ram:OccurrenceDateTime': {
              'udt:DateTimeString': {
                '@_format0': '102',
                '#text': params.invoice.date,
              },
            },
          },
        },
        'ram:ApplicableHeaderTradeSettlement': {
          'ram:InvoiceCurrencyCode': params.items[0].currency,
          'ram:SpecifiedTradeSettlementPaymentMeans': {
            'ram:PayeePartyCreditorFinancialAccount': {
              'ram:IBANID': params.supplier.iban,
            },
          },
          'ram:SpecifiedTradeSettlementHeaderMonetarySummation': {
            'ram:LineTotalAmount': Number(params.invoice.totalAmountNet).toFixed(2),
            'ram:TaxBasisTotalAmount': Number(params.invoice.totalAmountNet).toFixed(2),
            'ram:TaxTotalAmount': {
              '@_currencyID': params.items[0].currency,
              '#text': (Number(params.invoice.totalAmountGross) - Number(params.invoice.totalAmountNet)).toFixed(2),
            },
            'ram:GrandTotalAmount': Number(params.invoice.totalAmountGross).toFixed(2),
            'ram:DuePayableAmount': Number(params.invoice.totalAmountGross).toFixed(2),
          },
        },
      },
    },
  };
};
