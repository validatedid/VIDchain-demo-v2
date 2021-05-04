import { Injectable, Logger, BadRequestException} from "@nestjs/common";
import * as externals from "../api/externals";
import * as config from "../config";
import * as didAuth from '../interfaces/didAuth';
import {generateJwtRequest, verifyDidAuthResponse} from '../utils/DidAuthRequest'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);


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

  async didAuthRequest(): Promise<any> {
    try{
      const uriRequest = await generateJwtRequest();
      const uriDecoded = decodeURIComponent(uriRequest.urlEncoded) + "&client_name="+config.EntityDidKey.iss;
      return uriDecoded;
    }
    catch(error){
      throw new Error("error");
    }
  }

  async validateResponse(siopResponseJwt: didAuth.SiopResponseJwt): Promise<any> {
    try{
      const validationResponse = await verifyDidAuthResponse(siopResponseJwt);
      if (!validationResponse.signatureValidation) 
        throw new BadRequestException("Error verifying the DID Auth Token signature.");
      return validationResponse;
    }
    catch(error){
      throw new Error("Error validating the response");
    }
  }

  
}
