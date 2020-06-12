"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const mongoose = require("mongoose");
const session = require("express-session");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    mongoose.connect('mongodb://localhost/h5editor', {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).catch(err => { console.log(err); });
    const options = new swagger_1.DocumentBuilder()
        .setTitle('h5editor-api')
        .setDescription('h5编辑器API')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    app.use(session({
        secret: 'iceymoon',
        name: 'userInfo',
        resave: false,
        saveUninitialized: true
    }));
    await app.listen(7000);
}
bootstrap();
//# sourceMappingURL=main.js.map