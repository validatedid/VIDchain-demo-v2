import axios from "axios";
import * as config from "../config";
import {ICredentialData} from "../interfaces/dtos"

async function getUser (did: string){
    try{
        const response = await axios.get(`${config.BACKEND_URL}/users/${did}`);
        if (response.status !== 200 && response.status !== 201) {
            return "Error";
        }
        return response.data;
    }
    catch(error){
        return "Error";
    }
}

async function storeUser(user: ICredentialData){
    try{
        const response = await axios.post(`${config.BACKEND_URL}/users`, user);
        if (response.status !== 200 && response.status !== 201) {
            return "Error";
        }
        return response.data;
    }
    catch(error){
        console.log(error);
        return "Error";
    }
}

export { getUser, storeUser };