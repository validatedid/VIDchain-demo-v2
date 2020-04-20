import { Injectable } from '@nestjs/common';
import * as io from 'socket.io-client'
import * as config from './config';
import { Logger } from '@nestjs/common';
import {ValidateResponse, Signature, User} from "./interfaces/dtos"
import {VidchainBackend} from "./api/vidchainBackend";
import { parseJwt } from "./utils/Parser";
import Redis from 'ioredis';

@Injectable()
export class AppService {
  private logger: Logger = new Logger('LoginGateway');
  private readonly socket = io(config.BASE_URL);
  private vidchainBackend:VidchainBackend = new VidchainBackend();
  private readonly nonceRedis = new Redis({ keyPrefix: "nonce:" });
  private readonly userRedis = new Redis({ keyPrefix: "user:" });

  async getHello(): Promise<string> {
    var userDID = "did:ebsi:0x7748687e6Ad7a5eE05943890404f854739302Ad9";
    const nonce = await this.nonceRedis.get(userDID)
    const user = await this.userRedis.get(userDID)
    this.logger.log(`Nonce from DB:`)
    this.logger.log(nonce)
    this.logger.log(`User from DB:`)
    this.logger.log(user)
    //const socket = io(config.BASE_URL);
    // this.logger.log(`socket created:`)
    // socket.emit('login', 'hello from a client on the backend');
    return user;
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
      const tokenParsed = parseJwt(signature.signature);
      this.storeUserNonce(tokenParsed);

      var user = await this.getUser(tokenParsed.did)
      console.log(user);
      if(user !== null && user !== ""){
        this.sendUserDataToClient(user);
      }
      else{
        this.sendDataToClient(tokenParsed.did);
      }
      
    }
    return validateReponse;
  }

  async getUser(did: string){
    return await this.userRedis.get(did)
  }

 

  storeUserNonce(token){
    this.nonceRedis.set(token.did,token.nonce)
  }
  
  sendDataToClient(did){
    const socket = io(config.BASE_URL);
    socket.emit('login', did);
  }
  sendUserDataToClient(user){
    const socket = io(config.BASE_URL);
    socket.emit('access', user);
  }

  

 
}
