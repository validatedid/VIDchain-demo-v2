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
import axios from "axios";
import * as config from './../config';
import { Logger } from '@nestjs/common';
import { extractVCfromPresentation } from "../utils/Util";

@WebSocketGateway({ path: '/universityws', transports: ['websocket']})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  
  @WebSocketServer() wss: Server;
  private logger: Logger = new Logger('EventsGateway');

  afterInit() {
    this.logger.log('Initialized!')
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected:     ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected:     ${client.id}`)
  }
  
  @SubscribeMessage("presentationReady")
  async handlePresentationEvent(@MessageBody() credential: any): Promise <any> {
    this.logger.log(`Credential presentation:    ${credential}`);
    const jwt = extractVCfromPresentation(credential);
    const id = JSON.stringify(jwt.vc.credentialSubject.id);
    const did = id.substring(1, id.length - 1);
    const path = `${config.BASE_URL}/users/`;
    console.log("Reach Redis at endpoint: "+ path.concat(did));
    const response =  await axios.get(path.concat(did));
    const clientId = response.data;
    console.log("Retrived from Redis clientId "+ clientId +" for user "+ did);
    this.wss.to(clientId).emit("presentation", credential);
  }

  @SubscribeMessage('connectClient')
  connectClientEvent(@MessageBody() msg: any): void {
    this.logger.log(`Websocket frontend connected:    ${msg}`)
  }

  @SubscribeMessage("whoami")
  handleSesssion(@MessageBody() msg: any): void {
    this.logger.log(`This message has been sent by ${msg.did} whose socket clientId is now ${msg.clientId}`);
    const body = {
      did: msg.did,
      clientId: msg.clientId,
    };
    axios.post(config.BASE_URL+'/users', body)
      .catch ((error)=> console.log(error));
  }

}