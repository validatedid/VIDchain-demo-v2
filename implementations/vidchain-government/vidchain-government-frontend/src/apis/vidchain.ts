import axios from "axios";
import * as config from "../config";
import { ICredentialData } from "../interfaces/dtos";
import { strB64enc } from "../utils/utils";

/**
 * VIDCHAIN API REQUESTS
 * This requests can be performed even from the frontend because do not require any callback.
 */

// Get API authorization token
async function getAuthzToken() {
  const body = {
    grantType: config.grantType,
    assertion: strB64enc(config.Entity),
    scope: config.scope,
  };
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

// Request VerifiableID generation
async function generateVerifiableID(token: string, user: ICredentialData) {
  return request(token, user, "/verifiable-ids");
}

// Request Verifiable Credential generation
async function generateVerifiableCredential(
  token: string,
  user: ICredentialData
) {
  return request(token, user, "/verifiable-credentials");
}

// Simple axios post request
async function request(token: string, user: any, endpoint: string) {
  let authorization = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const response = await axios.post(
      config.API_URL.concat(endpoint),
      user,
      authorization
    );
    if (response.status !== 200 && response.status !== 201) {
      return "Error";
    }
    return response.data;
  } catch (error) {
    return "Error";
  }
}

export { getAuthzToken, generateVerifiableID, generateVerifiableCredential };
