const dotenv = require("dotenv");
// importing .env variables
dotenv.config();

const API_URL = "https://dev.api.vidchain.net/api/v1";
const IDENTITY_PROVIDER =
  process.env.REACT_APP_IDENTITY_PROVIDER || "https://dev.api.vidchain.net";
const REDIRECT_CALLBACK =
  process.env.REACT_APP_REDIRECT_CALLBACK ||
  "https://dev.api.vidchain.net/demo/university/callback";
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL ||
  "https://dev.api.vidchain.net/demo/universitybackend";
const BACKEND_WS = "/";
//const BACKEND_URL = "http://2899k7ae7ac7.ngrok.io/demo/universitybackend";
//const BACKEND_WS = "http://2899k7ae7ac7.ngrok.io";

//Legal Entity
const Entity = {
  iss: "ACME University",
  aud: "vidchain-api",
  nonce: "z-0427dc2515b1",
  callbackUrl: BACKEND_URL + "/presentation/validation",
};

//Entity in Base-64
const grantType = "urn:ietf:params:oauth:grant-type:jwt-bearer";
const scope = "vidchain profile test entity";

const CLIENT_ID = "university";
const CLIENT_NAME = "YourUniversity";
const CLIENT_SECRET = "secret";

export {
  Entity,
  grantType,
  scope,
  API_URL,
  BACKEND_URL,
  BACKEND_WS,
  IDENTITY_PROVIDER,
  REDIRECT_CALLBACK,
  CLIENT_ID,
  CLIENT_SECRET,
};
