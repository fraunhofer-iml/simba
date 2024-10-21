import { ConfigurationService } from '@ap3/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configuration = app.get(ConfigurationService);

  const config = new DocumentBuilder()
    .setTitle('SKALA AP3 backend for frontend')
    .setVersion('0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(configuration.getGeneralConfig().swaggerPath, app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );
  app.useLogger(configuration.getGeneralConfig().logLevel);
  app.enableCors();
  const port = configuration.getBFFConfig().port;
  await app.listen(port);
  Logger.log(`🚀 AP3 Backend for Frontend is running on: http://localhost:${port}`);
}

bootstrap();
