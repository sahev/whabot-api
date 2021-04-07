import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway"
import { BotGateway } from "./bot.gateway"

@Module({
  imports: [],
  exports: [ChatGateway, BotGateway],
  providers: [ChatGateway, BotGateway]
})

export class GatewayModule {}