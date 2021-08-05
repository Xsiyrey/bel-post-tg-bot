import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { TgService } from './service/tg.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [TgService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Bot started"', () => {
      expect(appController.init()).toBe('Bot started');
    });
  });
});
