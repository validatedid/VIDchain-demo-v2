import axios from "axios";
import * as config from "../config";
import {ICredentialData} from "../interfaces/ICredentialData"

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
    let authorization = {
        headers: {
          Authorization: "Bearer " + token
        }
    };
    try{
        const response = await axios.post(`${config.API_URL}/verifiable-ids`, user, authorization);
        if (response.status !== 200 && response.status !== 201) {
            return "Error";
        }
        return response.data;
    }
    catch(error){
        return "Error";
    }
}

export { getAuthzToken, generateVerifiableID };