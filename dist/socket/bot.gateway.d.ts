import { OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
export declare class BotGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private logger;
    afterInit(server: Socket): void;
    onCreatedBots(entity: any): void;
    onUpdatedBots(data: string): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
}
