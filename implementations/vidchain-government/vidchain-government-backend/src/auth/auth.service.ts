import { Injectable, Logger} from "@nestjs/common";
import { AxiosRequestConfig } from "axios";
import * as externals from "../api/externals";
import * as config from "../config";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);


  async getToken(url:string, body: any): Promise<any> {
    const headers = {
        "Content-Type": 'application/x-www-form-urlencoded',
    }
    try{
    const response = await externals.post(
      body,
      url,
      headers
    );
    console.log(response.data);
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
  
}
