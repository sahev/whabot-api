import { Module } from "@nestjs/common";
import { AppGateway } from "./socket.service"

@Module({
  imports: [],
  controllers: [],
  providers: [AppGateway]
})

export class AppGatewayModule {}