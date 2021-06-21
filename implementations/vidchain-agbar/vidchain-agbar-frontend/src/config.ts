const dotenv = require("dotenv");
// importing .env variables
dotenv.config();

const VIDCHAIN_IDENTITY_PROVIDER = process.env.REACT_APP_VIDCHAIN_IDENTITY_PROVIDER || "undefined";
const VIDCHAIN_REDIRECT_CALLBACK = 
  process.env.REACT_APP_VIDCHAIN_REDIRECT_CALLBACK || "undefined";

const API_URL = process.env.REACT_APP_API_URL || "undefined";
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL|| "undefined";
const BACKEND_WS = process.env.REACT_APP_WS_URL || "undefined";
const API_KEY = process.env.REACT_APP_API_KEY || "undefined";
const APP_URL = process.env.REACT_APP_DEMO || "undefined";

//Legal Entity
const Entity = {
  iss: "AGBAR",
  aud: "vidchain-api",
  nonce: "z-0427dc2515b1",
  callbackUrl: BACKEND_URL + "/presentation/validation",
  apiKey: API_KEY
};

//Entity in Base-64
const grantType = "urn:ietf:params:oauth:grant-type:jwt-bearer";
const scope = "vidchain profile entity";
//const scope = "vidchain profile test entity";

const CLIENT_ID = "agbar";

const VIDCHAIN_CLIENT_ID = "agbar";

export {
  Entity,
  grantType,
  scope,
  API_URL,
  BACKEND_URL,
  BACKEND_WS,
  CLIENT_ID,
  APP_URL,
  VIDCHAIN_CLIENT_ID,
  VIDCHAIN_IDENTITY_PROVIDER,
  VIDCHAIN_REDIRECT_CALLBACK
};
