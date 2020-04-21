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
  import { AppService } from '../app.service';
  import Redis from 'ioredis';
  import {User} from "../interfaces/dtos"

  
  @WebSocketGateway()
  export class LoginGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    private readonly userRedis = new Redis({ keyPrefix: "university-user:" });

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

    @SubscribeMessage('access')
    handleAccessEvent(@MessageBody() message: any): void {
      this.logger.log("handleAccessEvent:" + message);
      this.wss.emit('access', message);
    }

    @SubscribeMessage('registration')
    handleRegistrationEvent(@MessageBody() message: any): void {
      this.logger.log("handleRegistrationEvent:" + message);
      var user= JSON.parse(message);
      this.storeUser(user);
    }

    storeUser(user: any){
      this.userRedis.set(user.credentialSubject.id, JSON.stringify(user));
    }
  
  }