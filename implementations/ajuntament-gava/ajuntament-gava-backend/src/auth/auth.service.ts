import { Injectable, Logger} from "@nestjs/common";
import { userInfo } from "../interfaces/dtos";
import * as externals from "../api/externals";
import * as config from "../config";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);


  async handleUserInfo(url:string, body: any): Promise<any> {
    const response = await externals.post(
      body,
      url
    );
    if (!response || !response.data.access_token) {
        throw new Error(
          ` auth: Error retrieving the Access Token: ${response.status}`
        );
    }
    const access_token = response.data.access_token;
    
    const userInfo = await this.getUserInfo(access_token);
    return userInfo;
  }

  async getUserInfo(token:string): Promise<userInfo>{
      const response = await externals.get(config.IDENTITY_PROVIDER+"/serveis-rest/getUserInfo?AccessToken="+token);
      if (!response || response.status !== 200 || !response.data) {
        throw new Error(
          ` auth: Error retrieving the User Info: ${response.status}`
        );
    }
      return response.data;

  }
  
}
