import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorksModule } from './works/works.module';
import { UsersModule } from './users/users.module';
import { AuthLoginMiddleware } from './middlewares/authlogin.middleware';

@Module({
  imports: [WorksModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthLoginMiddleware)
      .forRoutes(
        { path: 'works', method: RequestMethod.POST },
        { path: 'works/:id', method: RequestMethod.PUT },
        { path: 'works/:id', method: RequestMethod.DELETE },
        { path: 'users', method: RequestMethod.PUT }
      )
  }
}
