/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { registerAs } from '@nestjs/config';

export const MINIO_IDENTIFIER = 'minio';

export interface MinioConfig {
  bucket: string;
  url: string;
  port: string;
  accessKey: string;
  secret: string;
  invoicePrefix: string;
  metadataPrefix: string;
  objectStorageURL: string;
}

export default registerAs(MINIO_IDENTIFIER, () => ({
  bucket: process.env['MINIO_BUCKET'] || 'skala-affds',
  url: process.env['MINIO_URL'] || '192.44.23.57',
  port: process.env['MINIO_PORT'] || '9000',
  accessKey: process.env['MINIO_ACCESS_KEY'] || '',
  secret: process.env['MINIO_SECRET'] || '',
  invoicePrefix: process.env['INVOICE_PREFIX'] || 'INV_',
  metadataPrefix: process.env['METADATA_PREFIX'] || 'METADATA_',
  objectStorageURL: process.env['OBJECT_STORAGE_URL'] || 'http://localhost:9001/buckets/ap3/',
}));
