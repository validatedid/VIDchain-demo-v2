import axios from "axios";
import * as config from "../config";

/**
* UNIVERSITY BACKEND REQUESTS 
The request of a Verifiable presentation should be handled in the backend so as to receive a response from the API in a callback
*/

async function claimVP(target: string, name: string) {
  let presentationType = [] as any;
  switch (name) {
    case "Login": {
      presentationType = ["VerifiableCredential", "VerifiableIdCredential"];
      break;
    }
    case "Large Family Card": {
      presentationType = ["VerifiableCredential", "LargeFamilyCard"];
      break;
    }
    default: {
      break;
    }
  }
  const presentation = {
    target: target,
    name: name,
    type: [presentationType],
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

export { claimVP };
