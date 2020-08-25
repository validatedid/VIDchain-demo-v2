const dotenv = require("dotenv");
dotenv.config();

const API_URL = "https://dev.api.vidchain.net/api/v1";
const IDENTITY_PROVIDER =
  process.env.REACT_APP_IDENTITY_PROVIDER || "https://dev.vidchain.net";
const REDIRECT_CALLBACK =
  process.env.REACT_APP_REDIRECT_CALLBACK ||
  "https://dev.vidchain.net/demo/government/callback";
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL ||
  "https://dev.vidchain.net/demo/governmentbackend";
const BACKEND_WS = process.env.REACT_APP_WS_URL || "/";
const API_KEY = process.env.REACT_APP_API_KEY|| "/";

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
