const dotenv = require("dotenv");
// importing .env variables
dotenv.config();

const API_URL = process.env.REACT_APP_API_URL || "undefined";
const IDENTITY_PROVIDER =
  process.env.REACT_APP_IDENTITY_PROVIDER || "undefined";
const REDIRECT_CALLBACK =
  process.env.REACT_APP_REDIRECT_CALLBACK || "undefined";
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL|| "undefined";
const BACKEND_WS = process.env.REACT_APP_WS_URL || "undefined";
const API_KEY = process.env.REACT_APP_API_KEY || "undefined";
const API_KEY_DIDKEY = process.env.REACT_APP_API_KEY_DIDKEY|| "undefined";
const APP_URL = process.env.REACT_APP_DEMO || "undefined";

//Legal Entity
const Entity = {
  iss: "Oceanic Airlines",
  aud: "vidchain-api",
  nonce: "z-0427dc2515b1",
  callbackUrl: BACKEND_URL + "/presentation/validation",
  apiKey: API_KEY
};

//Entity in Base-64
const grantType = "urn:ietf:params:oauth:grant-type:jwt-bearer";
const scope = "vidchain profile entity";

//Legal Entity
const EntityDidKey = {
  iss: "Oceanic Airlines DidKey",
  aud: "vidchain-api",
  nonce: "z-0427dc2515b1",
  callbackUrl: BACKEND_URL + "/presentation/validation",
  apiKey: API_KEY_DIDKEY
};
const DID_AUTH_REDIRECT = BACKEND_URL + "/auth/didAuthResponse";

//const scope = "vidchain profile test entity";

const CLIENT_ID = "airline";

const DID_URI_RESOLVER = `${API_URL}/identifiers`;



export {
  Entity,
  EntityDidKey,
  grantType,
  scope,
  API_URL,
  BACKEND_URL,
  BACKEND_WS,
  IDENTITY_PROVIDER,
  REDIRECT_CALLBACK,
  CLIENT_ID,
  APP_URL,
  DID_AUTH_REDIRECT,
  DID_URI_RESOLVER
};
