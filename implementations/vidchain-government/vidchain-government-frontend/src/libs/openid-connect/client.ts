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
        let config = {
			client_id: 'barcelona-vidchain',
			client_secret: 'secret',
			token: 'https://dev.api.vidchain.net/oauth2/token',
			authorization: 'https://dev.api.vidchain.net/oauth2/auth',
			redirect_uri: 'https://dev.api.vidchain.net/demo/callback',
            scopes: { request: ['openid', 'offline'], require: ['openid', 'offline']},
            response_type: "code"
        };
        this.client = new JSO(config);
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