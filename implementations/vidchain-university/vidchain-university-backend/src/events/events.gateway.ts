import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayInit,
  OnGatewayDisconnect,
  MessageBody,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import axios from "axios";
import * as config from "./../config";
import { Logger } from "@nestjs/common";
import { extractVCfromPresentation } from "../utils/Util";

@WebSocketGateway({ path: "/universityws", transports: ["websocket"], cookie: false})
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

  /**
   *  whoami ws message is used to store socket clientId -  did pair in a database so when the presentation is ready, the backend knows who has to aim the callback response.
   */
  @SubscribeMessage("whoami")
  handleSesssion(@MessageBody() msg: any): void {
    this.logger.log(
      `This message has been sent by ${msg.did} whose socket clientId is now ${msg.clientId}`
    );
    const body = {
      did: msg.did,
      clientId: msg.clientId,
    };
    axios
      .post(config.BASE_URL + "/users", body)
      .catch((error) => console.log(error));
  }

  /**
   *  presentationReady message is used to trigger the response of a Verifiable presentation. Notice that the did of user is retrieved from the credential and the socket clientId from the backend database.
   */
  @SubscribeMessage("presentationReady")
  async handlePresentationEvent(@MessageBody() credential: any): Promise<any> {
    this.logger.log(`Credential presentation:    ${credential}`);
    const jwt = extractVCfromPresentation(credential);
    const id = JSON.stringify(jwt.vc.credentialSubject.id);
    const did = id.substring(1, id.length - 1);
    const path = `${config.BASE_URL}/users/`;
    console.log("Reach Redis at endpoint: " + path.concat(did));
    const response = await axios.get(path.concat(did));
    const clientId = response.data;
    console.log(
      "Retrived from Redis clientId " + clientId + " for user " + did
    );
    //
    /**
     *  If different kind of presentations are handled by the backend entity, different messages should be emitted depending to avoid cross ws notifications
     */
    const type = JSON.stringify(jwt.vc.type[1]);
    if (type.substring(1, type.length - 1) == "LargeFamilyCard") {
      this.wss.to(clientId).emit("largeFamilyPresentation", credential);
    } else {
      this.wss.to(clientId).emit("presentation", credential);
    }
  }
}
