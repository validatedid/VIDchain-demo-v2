import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayInit,
    OnGatewayDisconnect,
    WsResponse,
    MessageBody,
    ConnectedSocket,
  } from '@nestjs/websockets';
  import { Socket, Server } from 'socket.io';
  import { Logger } from '@nestjs/common';



  
  @WebSocketGateway()
  export class LoginGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    
    @WebSocketServer() wss: Server;
    constructor() {

    }
    private logger: Logger = new Logger('LoginGateway');
  
    afterInit() {
      this.logger.log('Initialized!')
    }
  
    handleConnection(client: Socket) {
      this.logger.log(`Client connected:     ${client.id}`)
    }
  
    handleDisconnect(client: Socket) {
      this.logger.log(`Client disconnected:     ${client.id}`)
    }
    
   
    
    @SubscribeMessage('login')
    handleLoginEvent(@MessageBody() message: any): void {
      this.logger.log("handleLoginEvent:" + message);
      this.wss.emit('login', message);
    }
  
  }