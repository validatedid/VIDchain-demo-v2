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
        let clientConfig = {
			client_id: config.CLIENT_ID,
			client_secret: config.CLIENT_SECRET,
			token: config.IDENTITY_PROVIDER + '/oauth2/token',
			authorization: config.IDENTITY_PROVIDER + '/oauth2/auth',
			redirect_uri: config.REDIRECT_CALLBACK,
            scopes: { request: ['openid', 'offline'], require: ['openid', 'offline']},
            response_type: "code,token_id"
        };
        this.client = new JSO(clientConfig);
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


    /**
     * Method to get the url to start the flow
     */
// function startFlow() {
//     var url = API_HYDRA + "/oauth2/auth?";
//     const nonce = utils.randomString(24);
//     const state = utils.randomString(24);

//     const parameters: initiateFlow = {
//         audience: "",
//         client_id: "barcelona-city",
//         max_age: 0,
//         nonce: nonce,
//         prompt: "",
//         redirect_uri: REDIRECT_CALLBACK,
//         response_type: "code",
//         scope: "openid+offline",
//         state: state,
//     }
//     url = url + `audience=${parameters.audience}&`+
//     `client_id=${parameters.client_id}&`+
//     `max_age=${parameters.max_age}&`+
//     `nonce=${parameters.nonce}&`+
//     `prompt=${parameters.prompt}&`+
//     `redirect_uri=${parameters.redirect_uri}&`+
//     `response_type=${parameters.response_type}&`+
//     `scope=${parameters.scope}&`+
//     `state=${parameters.state}`;

//     console.log(url);

//     return url;
//   }


  }