import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { TgService } from './tg/tg.service';
import { TgMessageParserService } from './tg-message-parser/tg-message-parser.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [TgService, TgMessageParserService],
})
export class AppModule { }
