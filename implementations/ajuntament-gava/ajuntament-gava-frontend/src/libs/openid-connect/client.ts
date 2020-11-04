import * as config from "../../config";
import * as utils from "../../utils/utils";

// @ts-ignore
import { JSO, Popup } from "jso";

export class OpenIDClient {
  private static _instance: OpenIDClient;
  private provider: any;
  private client: any;

  private constructor() {
    let configFile = {
      client_id: config.CLIENT_ID,
      token: config.IDENTITY_PROVIDER + "/oauth2/token",
      authorization: config.IDENTITY_PROVIDER + "/oauth2/auth",
      redirect_uri: config.REDIRECT_CALLBACK,
      scopes: {
        request: ["autenticacio_usuari"]
      },
      response_type: "code",
      request: {
        access_type: "online",
        approval_prompt: "auto",
      },
      debug: true,
    };
    this.client = new JSO(configFile);
  }

  public static getInstance(): OpenIDClient {
    return this._instance || (this._instance = new this());
  }

  public getClient(): any {
    return this.client;
  }

  public getProvider(): any {
    return this.provider;
  }
}
