import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose';
import * as session from 'express-session';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import bodyParser = require('body-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  mongoose.connect('mongodb://localhost/h5editor', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  }).catch(err => { console.log(err) });
  const options = new DocumentBuilder()
    .setTitle('h5editor-api')
    .setDescription('h5编辑器API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  app.use(session({
    secret: 'iceymoon',
    name: 'userInfo',
    resave: false,
    saveUninitialized: true
  }))
  app.use(bodyParser.json({ limit: '2100000kb' }));
  app.enableCors({ origin: 'https://iceymoon07.github.io/h5editor/' });
  await app.listen(7000);
}
bootstrap();
