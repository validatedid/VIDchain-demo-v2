import axios from "axios";
import * as config from "../config";
import { Presentation } from "../interfaces/dtos";

/**
* GOVERNMENT BACKEND REQUESTS 
The request of a Verifiable presentation must be handled in the backend so as to receive a response from the API in a callback
*/

async function claimVP(target: string, name: string) {
  const presentation: Presentation = {
    target: target,
    name: name,
    type: [["VerifiableCredential", "VerifiableIdCredential"]],
  };
  try {
    const response = await axios.post(
      `${config.BACKEND_URL}/presentation/request`,
      presentation
    );
    if (response.status !== 200 && response.status !== 201) {
      return "Error";
    }
    return response.data;
  } catch (error) {
    return "Error";
  }
}

async function getToken(body: any) {
  try {
    const response = await axios.post(
      `${config.BACKEND_URL}/auth`,
      body
    );
    if (response.status !== 200 && response.status !== 201) {
      return "Error";
    }
    return response.data;
  } catch (error) {
    return "Error";
  }
}

export { claimVP, getToken };
