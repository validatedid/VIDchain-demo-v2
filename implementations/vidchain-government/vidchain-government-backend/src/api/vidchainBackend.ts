import axios from "axios";
import * as config from "../config";
import {
  RequestPresentation,
  VerifiablePresentation,
  CredentialData,
} from "../interfaces/dtos";
import { strB64enc } from "../utils/Util";

async function getAuthzToken() {
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

async function requestVP(token: string, presentation: RequestPresentation) {
  const authorization = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const response = await axios.post(
      `${config.API_URL}/verifiable-presentations-requests`,
      presentation,
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

async function validateVP(
  token: string,
  presentation: VerifiablePresentation
): Promise<boolean> {
  const authorization = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    console.log(presentation);
    const response = await axios.post(
      `${config.API_URL}verifiable-presentation-validations`,
      presentation,
      authorization
    );
    console.log(response.status);
    if (response.status !== 204) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

async function retrievePresentation(token: string, url: string) {
  const authorization = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const response = await axios.get(url, authorization);
    if (response.status !== 200 && response.status !== 201) {
      return "Error";
    }
    return response.data;
  } catch (error) {
    return "Error";
  }
}

async function generateVerifiableCredential(
  token: string,
  data: CredentialData
) {
  const authorization = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const response = await axios.post(
      `${config.API_URL}/verifiable-credentials`,
      data,
      authorization
    );
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
