import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  mongoose.connect('mongodb://localhost/h5editor', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).catch(err => { console.log(err) });
  const options = new DocumentBuilder()
    .setTitle('h5editor-api')
    .setDescription('h5编辑器API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document)
  await app.listen(3000);
}
bootstrap();
