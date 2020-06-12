"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const works_module_1 = require("./works/works.module");
const users_module_1 = require("./users/users.module");
const authlogin_middleware_1 = require("./middlewares/authlogin.middleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(authlogin_middleware_1.AuthLoginMiddleware)
            .forRoutes({ path: 'works', method: common_1.RequestMethod.POST }, { path: 'works/:id', method: common_1.RequestMethod.PUT }, { path: 'works/:id', method: common_1.RequestMethod.DELETE }, { path: 'users', method: common_1.RequestMethod.PUT });
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [works_module_1.WorksModule, users_module_1.UsersModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map