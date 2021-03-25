import { Injectable, Logger} from "@nestjs/common";
import * as externals from "../api/externals";
import * as config from "../config";
import {generateJwtRequest} from '../utils/DidAuthRequest'

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
      console.log("in did auth request");
      const uriRequest = await generateJwtRequest();
      console.log(uriRequest);
      const uriDecoded = decodeURIComponent(uriRequest.urlEncoded) + "&client_name="+config.EntityDidKey.iss;
      return uriDecoded;
    }
    catch(error){
      throw new Error("error");
    }
  }

  
}
