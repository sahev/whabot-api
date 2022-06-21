import { OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
export declare class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private logger;
    afterInit(server: Socket): void;
    log(client: Socket): void;
    onCreatedChats(entity: any): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
}
