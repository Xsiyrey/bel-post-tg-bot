import { Injectable } from '@nestjs/common';

const commandNameRegex: RegExp = /^\/(\w+)/;

@Injectable()
export class TgMessageParserService {
  getMessage(str: string): string {
    return str.substring((commandNameRegex.exec(str)[0] ?? '').length)?.trim();
  }
}
