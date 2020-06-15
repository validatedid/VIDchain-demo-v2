import axios from "axios";
import * as config from "../config";
import {Presentation} from "../interfaces/dtos";

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

async function requestVP (token: string, presentation: Presentation){
    let authorization = {
        headers: {
          Authorization: "Bearer " + token
        }
    };
    try{
        const response = await axios.post(`${config.API_URL}/verifiable-presentations-requests`, presentation, authorization);
        if (response.status !== 200 && response.status !== 201) {
            return "Error";
        }
        return response.data;
    }
    catch(error){
        return "Error";
    }
}

export { getAuthzToken, requestVP };