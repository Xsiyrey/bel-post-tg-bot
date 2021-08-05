import { Controller, Get } from '@nestjs/common';
import { TgService } from './service/tg.service';

@Controller()
export class AppController {
  constructor(private readonly tgService: TgService) {
    this.tgService.init();
  }

  @Get()
  init(): string {
    return 'Bot started';
  }
}
