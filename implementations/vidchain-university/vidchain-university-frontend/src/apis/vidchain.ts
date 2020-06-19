import axios from "axios";
import * as config from "../config";
import {ICredentialData} from "../interfaces/ICredentialData";
import {IPresentation} from "../interfaces/IPresentation";
import { request } from "https";

async function getAuthzToken() {
    const body = {
        grantType: config.grantType,
        assertion: config.assertion,
        scope: config.scope,
      };
    try{
        const response = await axios.post(`${config.API_URL}/sessions`, body);
        if (response.status !== 200 && response.status !== 201) {
            return "Error";
        }
        return response.data.accessToken;
    }
    catch(error){
        return "Error";
    }
} 

async function generateVerifiableID(token: string, user: ICredentialData){
    return requestVIDChain(token, user, '/verifiable-ids');
}

async function generateVerifiableCredential(token: string, user: ICredentialData){
    return requestVIDChain(token, user, '/verifiable-credentials');
}

async function requestVP (token: string, presentation: IPresentation){
    return requestVIDChain(token, presentation, '/verifiable-presentations-requests');
}

async function requestVIDChain(token: string, user: any, endpoint: string){
    let authorization = {
        headers: {
          Authorization: "Bearer " + token
        }
    };
    try{
        const response = await axios.post(config.API_URL.concat(endpoint), user, authorization);
        if (response.status !== 200 && response.status !== 201) {
            return "Error";
        }
        return response.data;
    }
    catch(error){
        return "Error";
    }
}

export { getAuthzToken, generateVerifiableID, generateVerifiableCredential, requestVP};