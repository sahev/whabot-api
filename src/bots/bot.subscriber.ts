import { BotGateway } from "../socket/bot.gateway";
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from "typeorm";
import { Bots } from "../entities/index";
import { BotsServices } from "./bots.service";

@EventSubscriber()
export class BotsSubscriber implements EntitySubscriberInterface<Bots> {
  constructor(
    connection: Connection,
    private botGateway: BotGateway,
    private botService: BotsServices
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Bots;
  }

  afterInsert(event: InsertEvent<any>): void {
    console.log("afterinsert ", event.entity);

    this.emitCreatedBots(event.entity);
  }

  afterUpdate(event: UpdateEvent<any>): void {
    console.log("afterUpdate");

    this.emitUpdatedBots();
  }

  async emitCreatedBots(entity: any): Promise<void> {
    // const event = await this.botService.getBots(entity);
    console.log("emitCreatedBots ", entity);

    this.botGateway.onCreatedBots(entity);
  }

  async emitUpdatedBots(): Promise<void> {
    const event = await this.botService.getBots({bot_user: "1"});
    console.log("emitUpdatedBots ", event);

    this.botGateway.onUpdatedBots(event);
  }
}
