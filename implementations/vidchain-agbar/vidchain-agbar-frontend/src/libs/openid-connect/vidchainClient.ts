import * as config from "../../config";
import * as utils from "../../utils/utils";

// @ts-ignore
import { JSO, Popup } from "jso";

export class VidchainClient {
  private static _instance: VidchainClient;
  private provider: any;
  private client: any;

  private constructor() {
    let configFile = {
      client_id: config.VIDCHAIN_CLIENT_ID,
      token: config.VIDCHAIN_IDENTITY_PROVIDER + "/oauth2/token",
      authorization: config.VIDCHAIN_IDENTITY_PROVIDER + "/oauth2/auth",
      redirect_uri: config.VIDCHAIN_REDIRECT_CALLBACK,
      response_type: "code",
      debug: true,
    };
    this.client = new JSO(configFile);
  }

  public static getInstance(): VidchainClient {
    return this._instance || (this._instance = new this());
  }

  public getClient(): any {
    return this.client;
  }

  public getProvider(): any {
    return this.provider;
  }
}
