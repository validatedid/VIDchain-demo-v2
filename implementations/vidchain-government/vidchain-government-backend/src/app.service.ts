import { Injectable } from '@nestjs/common';
import * as io from 'socket.io-client'
import * as config from './config';
import { Logger } from '@nestjs/common';
import {ValidateResponse, Signature} from "./interfaces/dtos"
import {vidchainBackend} from "./api/vidchainBackend";

@Injectable()
export class AppService {
  private logger: Logger = new Logger('LoginGateway');
  private readonly socket = io(config.BASE_URL);

  getHello(): string {
    //var allowedOrigins = "http://localhost:* http://127.0.0.1:*";
    const socket = io(config.BASE_URL);
    this.logger.log(`socket created:`)
    socket.emit('login', 'hello from a client on the backend');
    return 'Hello World!';
  }

  async validate(signature: Signature): Promise<ValidateResponse> {
    var validateReponse:ValidateResponse = {
      response: "success"
    }
    const validate = await vidchainBackend.validateJWTInBackend(signature);
    const socket = io(config.BASE_URL);
    socket.emit('login', 'hello from a client on the backend');
    return validateReponse;
  }

 
}
