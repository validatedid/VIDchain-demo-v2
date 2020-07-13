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
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { Logger, BadRequestException } from "@nestjs/common";

@WebSocketGateway({ path: "/governmentws", transports: ["websocket"] })
export class EventsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer() wss: Server;
  private logger: Logger = new Logger("EventsGateway");

  afterInit() {
    this.logger.log("Initialized!");
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected:     ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected:     ${client.id}`);
  }

  @SubscribeMessage("presentationReady")
  handlePresentationEvent(@MessageBody() credential: any): void {
    this.logger.log(`Credential presentation:    ${credential}`);
    this.wss.emit("presentation", credential);
  }

  @SubscribeMessage("connectClient")
  connectClientEvent(@MessageBody() msg: any): void {
    this.logger.log(`Websocket frontend connected:    ${msg}`);
  }
}
