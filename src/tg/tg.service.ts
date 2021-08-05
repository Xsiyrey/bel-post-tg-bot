import { TgMessageParserService } from './../tg-message-parser/tg-message-parser.service';
import { fetch } from 'cross-fetch';
import { CommandCollection } from '../model/collection/command/command.collection';
import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { Context } from 'node:vm';
import { Cron, CronExpression } from '@nestjs/schedule';
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const commands = new CommandCollection([]);

const params = [];

@Injectable()
export class TgService {
  constructor(private readonly messageParser: TgMessageParserService) {
  }

  init() {
    bot.start(this.start);
    bot.help(this.help);
    bot.command("set", ctx => this.set(ctx, this.messageParser));
    bot.command("remove", ctx => this.remove(ctx, this.messageParser));
    bot.command("list", ctx => this.list(ctx))
    bot.launch();
  }

  private start(ctx: Context & { startPayload: string }) {
    ctx.reply('Hi');
  }

  private help(ctx: Context) {
    ctx.reply('help');
  }

  private set(ctx: any, messageParser: TgMessageParserService) {
    const mes = messageParser.getMessage(ctx.message.text);
    if (mes && !params.some(x => x.chatId === ctx.chat.id && x.number === mes))
      params.push({ chatId: ctx.chat.id, number: mes })
  }

  private remove(ctx: any, messageParser: TgMessageParserService) {
    const mes = messageParser.getMessage(ctx.message.text);
    if (mes && params.some(x => x.chatId === ctx.chat.id && x.number === mes))
      params.splice(params.findIndex(x => x.chatId === ctx.chat.id && x.number === mes), 1);
  }

  private list(ctx: any) {
    const list = params.filter(x => x.chatId === ctx.chat.id).map(x => x.number).join("\n");
    if (list)
      bot.telegram.sendMessage(ctx.chat.id, params.filter(x => x.chatId === ctx.chat.id).map(x => x.number).join("\n"));
    else
      bot.telegram.sendMessage(ctx.chat.id, "List are empty");
  }

  @Cron(CronExpression.EVERY_MINUTE)
  notificate() {
    params.forEach((element) => {

      fetch("https://api.belpost.by/api/v1/tracking", {
        method: "POST",
        body: JSON.stringify({
          number: element.number
        }),
        headers: {
          "Content-type": "applicaiton/json; charset=UTF-8"
        }
      }).then(response => response.json()).then(json => bot.telegram.sendMessage(element.chatId, json)).catch(e => console.log(e))
    }
    );
  }
}
