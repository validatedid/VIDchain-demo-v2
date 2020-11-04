import { Injectable, Logger} from "@nestjs/common";
import { UserInfo } from "../interfaces/dtos";
import * as externals from "../api/externals";
import * as config from "../config";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);


  async handleUserInfo(url:string, body: any): Promise<any> {
    const bodyWithSecret = {
      ...body,
      client_secret: config.CLIENT_SECRET
    }
    const response = await externals.post(
      bodyWithSecret,
      url
    );
    if (!response || !response.data.access_token) {
        throw new Error(
          ` auth: Error retrieving the Access Token: ${response.status}`
        );
    }
    const access_token = response.data.access_token;
    
    const userInfo = await this.getUserInfo(access_token);
    //After the get Info we close the session.
    await this.logout(access_token);
    return userInfo;
  }

  async getUserInfo(token:string): Promise<UserInfo>{
      const response = await externals.get(config.IDENTITY_PROVIDER+"/serveis-rest/getUserInfo?AccessToken="+token);
      if (!response || response.status !== 200 || !response.data) {
        throw new Error(
          ` auth: Error retrieving the User Info: ${response.status}`
        );
    }
      return response.data;

  }

  async logout(token: string){
    console.log("to logout");
    await externals.get(config.IDENTITY_PROVIDER+"/o/oauth2/logout?token="+token);
  }
  
}
