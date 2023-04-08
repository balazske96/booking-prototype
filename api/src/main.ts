import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  const appVersion = app.get(ConfigService).get('APP_VERSION') ?? '1.0';

  if (!!process.env.SWAGGER && process.env.SWAGGER === 'true') {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Booking')
      .setDescription('The Booking API documentation')
      .setVersion(appVersion)
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
  }

  await app.listen(4000);
}
bootstrap();
