import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '../public'));
  //set up web application
  app.setBaseViewsDir(join(__dirname, '../public/view'));
  app.setViewEngine('ejs');
  //set up swagger
  const config = new DocumentBuilder()
    .setTitle('Demo API')
    .setDescription('A Demo API with CRUD functionality')
    .addServer('http://localhost:3000','local host server')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}

bootstrap()
