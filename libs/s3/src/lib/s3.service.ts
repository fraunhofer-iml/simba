/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConfigurationService } from '@ap3/config';
import { Client } from 'minio';
import { MINIO_CONNECTION } from 'nestjs-minio';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class S3Service {
  constructor(
    @Inject(MINIO_CONNECTION) private readonly minioClient: Client,
    private readonly config: ConfigurationService
  ) {}

  uploadPdf(file: Buffer, name: string) {
    return this.minioClient.putObject(this.config.getMinioConfig().bucket, name, file, file.length, {
      'Content-Type': 'application/pdf',
    });
  }

  uploadJson(file: Buffer, name: string) {
    return this.minioClient.putObject(this.config.getMinioConfig().bucket, name, file, file.length, {
      'Content-Type': 'application/json',
    });
  }

  fetchFile(fileName: string) {
    return this.minioClient.getObject(this.config.getMinioConfig().bucket, fileName);
  }

  public convertFileNameToUrl(fileName: string) {
    const baseUrl = this.config.getMinioConfig().objectStorageURL;
    if(fileName.includes(baseUrl)){
      return fileName;
    }
    return baseUrl + fileName;
  }
}
