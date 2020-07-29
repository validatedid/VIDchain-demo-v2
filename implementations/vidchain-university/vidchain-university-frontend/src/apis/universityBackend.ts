import axios from "axios";
import * as config from "../config";
import { Presentation } from '../interfaces/dtos';

async function claimVP(target: string){
    const presentation: Presentation = {
        target: target,
        name: "verifiableKYC",
        type: [
            [
                "VerifiableCredential",
                "VerifiableIdCredential"
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


export { claimVP, getRequest, postRequest };