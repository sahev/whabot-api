import { BotGateway } from "../socket/bot.gateway";
import { Connection, EntitySubscriberInterface, InsertEvent } from "typeorm";
import { Bots } from "../entities/index";
import { BotsServices } from "./bots.service";
import { Socket } from "socket.io";
export declare class BotsSubscriber implements EntitySubscriberInterface<Bots> {
    private botGateway;
    private botService;
    constructor(connection: Connection, botGateway: BotGateway, botService: BotsServices);
    socket: Socket;
    listenTo(): typeof Bots;
    afterInsert(event: InsertEvent<any>): void;
    emitCreatedBots(entity: any): Promise<void>;
}
