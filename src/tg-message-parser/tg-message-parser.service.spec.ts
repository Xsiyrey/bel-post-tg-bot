import { Test, TestingModule } from '@nestjs/testing';
import { TgMessageParserService } from './tg-message-parser.service';

describe('TgMessageParserService', () => {
  let service: TgMessageParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TgMessageParserService],
    }).compile();

    service = module.get<TgMessageParserService>(TgMessageParserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
