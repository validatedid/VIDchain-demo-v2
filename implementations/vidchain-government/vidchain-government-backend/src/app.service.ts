import { Injectable } from '@nestjs/common';
import * as io from 'socket.io-client'
import * as config from './config';
import { Logger } from '@nestjs/common';
import {ValidateResponse, Signature} from "./interfaces/dtos"
import {VidchainBackend} from "./api/vidchainBackend";
import { parseJwt } from "./utils/Parser";
@Injectable()
export class AppService {
  private logger: Logger = new Logger('LoginGateway');
  private readonly socket = io(config.BASE_URL);
  private vidchainBackend:VidchainBackend = new VidchainBackend();

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
    
    const validate:any = await this.vidchainBackend.validateJWTInBackend(signature);
    if(!validate.payload){
      validateReponse.response = "error";
    }
    else{
      const user = this.getUser(signature.signature);
      const socket = io(config.BASE_URL);
      socket.emit('login', '{}');
    }
    return validateReponse;
  }

  getUser(signature){
    var token = parseJwt(signature);
    this.logger.log(`token:`);
    this.logger.log(token);
  }

 
}
