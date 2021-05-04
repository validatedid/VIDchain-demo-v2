import { Injectable, Logger, BadRequestException} from "@nestjs/common";
import Redis from "ioredis";
import * as externals from "../api/externals";
import * as config from "../config";
import * as didAuth from '../interfaces/didAuth';
import {generateJwtRequest, verifyDidAuthResponse} from '../utils/DidAuthRequest';
import {getJwtNonce} from '../utils/Util';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly nonceRedis = new Redis({
    port: process.env.REDIS_PORT, 
    host: process.env.REDIS_URL,
    keyPrefix: "airline-nonce:",
  });


  async getToken(url:string, body: any): Promise<any> {
    const headers = {
        "Content-Type": 'application/x-www-form-urlencoded',
    }
    try{
      const bodyWithSecret = {
        ...body,
        client_secret: config.CLIENT_SECRET
      }
      const response = await externals.post(
        bodyWithSecret,
        url,
        headers
      );
      if (!response || !response.data.access_token) {
          throw new Error(
            ` auth: Error retrieving the Access Token: ${response.status}`
          );
      }

      return response.data;
  }
  catch(error){
    throw new Error("error");
  }
  }

  async didAuthRequest(socketId: string): Promise<any> {
    try{
      const uriRequest = await generateJwtRequest(socketId);
      //Store the nonce and socketId in DB
      await this.nonceRedis.set(getJwtNonce(uriRequest.jwt), socketId);
      const uriDecoded = decodeURIComponent(uriRequest.urlEncoded) + "&client_name="+config.EntityDidKey.iss;
      return uriDecoded;
    }
    catch(error){
      throw new Error("error");
    }
  }

  async validateResponse(siopResponseJwt: didAuth.SiopResponseJwt): Promise<didAuth.BackendResponseSiop> {
    try{
      //Get the nonce and socketId from DB
      const nonce = getJwtNonce(siopResponseJwt.id_token);
      const clientId = await this.nonceRedis.get(nonce);
      if(!nonce || clientId){
        throw new BadRequestException("Error retriving the nonce of the token");
      }
      const validationResponse = await verifyDidAuthResponse(siopResponseJwt);
      if (!validationResponse.signatureValidation) 
        throw new BadRequestException("Error verifying the DID Auth Token signature.");
      return {validationResponse, socketId: clientId};
    }
    catch(error){
      throw new Error("Error validating the response");
    }
  }

  
}
