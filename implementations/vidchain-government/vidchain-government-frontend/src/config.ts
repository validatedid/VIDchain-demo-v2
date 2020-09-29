const dotenv = require("dotenv-flow");
dotenv.config();

const API_URL = process.env.REACT_APP_API_URL || "undefined";
const IDENTITY_PROVIDER =
  process.env.REACT_APP_IDENTITY_PROVIDER || "undefined";
const REDIRECT_CALLBACK =
  process.env.REACT_APP_REDIRECT_CALLBACK || "undefined";
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "undefined";
const BACKEND_WS = process.env.REACT_APP_WS_URL || "undefined";
const API_KEY = process.env.REACT_APP_API_KEY || "undefined";

//Legal Entity
const Entity = {
  iss: "Government of Freedonia",
  aud: "vidchain-api",
  nonce: "z-0427dc2515b1",
  callbackUrl: BACKEND_URL + "/presentation/validation",
  apiKey: API_KEY
};

const grantType = "urn:ietf:params:oauth:grant-type:jwt-bearer";
const scope = "vidchain profile entity";
//const scope = "vidchain profile test entity";

const DID = "did:vid:0xfB5390914b110BEB6c0B250CB59b23E156B68e29";

//const CLIENT_ID = "city-test";
const CLIENT_ID = "city";
const CLIENT_NAME = "Your City";
const CLIENT_SECRET = "secret";

export {
  Entity,
  grantType,
  scope,
  API_URL,
  IDENTITY_PROVIDER,
  REDIRECT_CALLBACK,
  CLIENT_ID,
  CLIENT_SECRET,
  BACKEND_URL,
  DID,
  BACKEND_WS,
};
