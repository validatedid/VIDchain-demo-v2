import * as config from '../../config';
import * as utils from "../../utils/utils";

// @ts-ignore
import {JSO, Popup} from 'jso'


export class OpenIDClient {
    private static _instance: OpenIDClient;
    private provider: any;
    private client: any;

    private constructor(){ 
        const nonce = utils.randomString(24);
        const state = utils.randomString(24);
        let configFile = {
			client_id: config.CLIENT_ID,
			client_secret: config.CLIENT_SECRET,
			token: config.IDENTITY_PROVIDER + '/oauth2/token',
			authorization: config.IDENTITY_PROVIDER + '/oauth2/auth',
			redirect_uri: config.REDIRECT_CALLBACK,
            scopes: { request: ['openid','offline'], require: ['openid','offline']},
            response_type: "code",
            debug:true
        };
        this.client = new JSO(configFile);
        console.log(this.client);
    }
    
    public static getInstance(): OpenIDClient
    {
        return this._instance || (this._instance = new this());
    };

   
    public getClient(): any{
        return this.client;
    }

    public getProvider(): any{
        return this.provider;
    }

    


  }