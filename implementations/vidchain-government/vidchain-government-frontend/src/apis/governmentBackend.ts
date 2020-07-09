import axios from "axios";
import * as config from "../config";
import {ICredentialData} from "../interfaces/dtos"
import { Presentation, verifiableKYC } from '../interfaces/dtos';



async function getUser (did: string){
    let path = `${config.BACKEND_URL}/users/`; 
    let endpoint = path.concat(did);
    return getRequest(endpoint);
}

async function storeUser(user: ICredentialData){
    return postRequest(`${config.BACKEND_URL}/users`, user);
}

async function claimVP(target: string){
    const presentation: Presentation = {
        target: target,
        name: "verifiableKYC",
        type: [
            [
                "VerifiableCredential",
                "VidKycCredential"
            ]
        ],
    }
    return postRequest(`${config.BACKEND_URL}/presentation/request`, presentation);
}


async function getRequest(endpoint: string){
    try{
        const response = await axios.get(endpoint);
        if (response.status !== 200 && response.status !== 201) {
            return "Error";
        }
        return response.data;
    }
    catch(error){
        return "Error";
    }
}

async function postRequest(endpoint: string, body: any){
    try{
        const response = await axios.post(endpoint, body);
        if (response.status !== 200 && response.status !== 201) {
            return "Error";
        }
        return response.data;
    }
    catch(error){
        return "Error";
    }
}


export { getUser, storeUser, claimVP, getRequest, postRequest };