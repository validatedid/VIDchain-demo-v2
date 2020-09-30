import axios from "axios";
import * as config from "../config";
import {
  RequestPresentation,
  VerifiablePresentation,
  CredentialData,
} from "../interfaces/dtos";
import { strB64enc } from "../utils/Util";

// Simple axios post request
async function postRequest(token: string, user: any, endpoint: string) {
  const authorization = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    console.log("request VO");
    console.log(config.API_URL.concat(endpoint));
    console.log(authorization);
    console.log(user);
    const response = await axios.post(
      config.API_URL.concat(endpoint),
      user,
      authorization
    );
    if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
      return "Error";
    }
    // Some requests return an empty response with status 204
    if(response.status === 204){
      return "Ok"
    }
    return response.data;
  } catch (error) {
    return "Error";
  }
}

// Get API authentication token
async function getAuthzToken() {
  console.log("ENTITY:"+JSON.stringify(config.Entity));
  const body = {
    grantType: config.grantType,
    assertion: strB64enc(config.Entity),
    scope: config.scope,
  };
  console.log(body);
  try {
    const response = await axios.post(`${config.API_URL}/sessions`, body);
    if (response.status !== 200 && response.status !== 201) {
      return "Error";
    }
    return response.data.accessToken;
  } catch (error) {
    return "Error";
  }
}

// Request Presentation
async function requestVP(token: string, presentation: RequestPresentation) {
  return postRequest(
    token,
    presentation,
    "verifiable-presentations-requests"
  );
}

// Validate Presentation
async function validateVP(
  token: string,
  presentation: VerifiablePresentation
): Promise<boolean> {
  return postRequest(
    token,
    presentation,
    "verifiable-presentation-validations"
  );
}

// Request Verifiable Credential generation
async function generateVerifiableCredential(
  token: string,
  user: CredentialData
) {
  return postRequest(token, user, "/verifiable-credentials");
}
// Retrieve Presentation
async function retrievePresentation(token: string, url: string) {
  const authorization = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    console.log("rerieve peresentatttttionnn");
    console.log(url);
    console.log(authorization);
    const response = await axios.get(url, authorization);
    console.log(response.status);
    if (response.status !== 200 && response.status !== 201) {
      return "Error";
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return "Error";
  }
}

export {
  getAuthzToken,
  requestVP,
  retrievePresentation,
  validateVP,
  generateVerifiableCredential,
};
