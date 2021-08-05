import { CommandCollection } from '../model/collection/command/command.collection';
import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { Context } from 'node:vm';
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const commands = new CommandCollection([]);

@Injectable()
export class TgService {
  init() {
    bot.start(this.start);
    bot.help(this.help);
    bot.launch();
  }

  private start(ctx: Context & { startPayload: string }) {
    ctx.reply('Hi');
  }

  private help(ctx: Context) {
    ctx.reply('help');
  }
}
