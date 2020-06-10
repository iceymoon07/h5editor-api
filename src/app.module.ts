import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorksModule } from './works/works.module';

@Module({
  imports: [WorksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
