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

  fetchFile(fileName: string) {
    return this.minioClient.getObject(this.config.getMinioConfig().bucket, fileName);
  }
}
