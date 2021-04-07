import { Logger } from "@nestjs/common"
import { SubscribeMessage, WebSocketGateway, WsResponse, OnGatewayConnection, WebSocketServer, ConnectedSocket, MessageBody } from "@nestjs/websockets"
import { Socket, Server } from "socket.io"

@WebSocketGateway({namespace: '/chats'})
export class AppGateway implements OnGatewayConnection {
  
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Socket) {
    this.logger.log("Inicializado!")
  }

  @SubscribeMessage('msgToServer')
  handleMessage(
    @ConnectedSocket() client: Socket, 
    @MessageBody() body: { message: string} ): void {
    // funct = void
    // client.emit('MessageToClient', text)

    // return { event: 'msgToClient', data: text}
    console.log(client, body);
    
    this.server.emit('msgToClient', body)
  }

  @SubscribeMessage('events')
  handleEvent(data: Socket): WsResponse<unknown> {
    const event = 'events';
    console.log(event);
    
    return { event, data };
  }
  

  handleConnection(client: Socket) {
    this.logger.log(`client connected: ${client.id}`)
  }
  
  
}



