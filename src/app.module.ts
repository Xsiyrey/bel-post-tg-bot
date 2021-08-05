import { TgService } from './Service/tg.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [TgService],
})
export class AppModule {}
