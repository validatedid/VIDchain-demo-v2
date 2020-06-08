import { initiateFlow } from "./dtos";
import * as utils from "../../utils/utils";

const API_HYDRA = "https://dev.api.vidchain.net";
const REDIRECT_CALLBACK = process.env.REDIRECT_CALLBACK || "http%3A%2F%2F127.0.0.1%3A3022%2Fcallback"

/**
 * Method to get the url to start the flow
 */
function startFlow() {
    var url = API_HYDRA + "/oauth2/auth?";
    const nonce = utils.randomString(24);
    const state = utils.randomString(24);

    const parameters: initiateFlow = {
        audience: "",
        client_id: "barcelona",
        max_age: 0,
        nonce: nonce,
        prompt: "",
        redirect_uri: REDIRECT_CALLBACK,
        response_type: "code,id_token",
        scope: "openid+offline",
        state: state,
    }
    url = url + `audience=${parameters.audience}&`+
    `client_id=${parameters.client_id}&`+
    `max_age=${parameters.max_age}&`+
    `nonce=${parameters.nonce}&`+
    `prompt=${parameters.prompt}&`+
    `redirect_uri=${parameters.redirect_uri}&`+
    `response_type=${parameters.response_type}&`+
    `scope=${parameters.scope}&`+
    `state=${parameters.state}`;

    return url;
  }

  export {
    startFlow
  };
  