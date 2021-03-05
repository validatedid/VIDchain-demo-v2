const dotenv = require("dotenv");
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

const DID = "0xF996fc66a524eF766a15d9dae8dDD3A4Eb7796CB";

//const CLIENT_ID = "city-test";
const CLIENT_ID = "city";

const eidasCertificatePassword = "1234";

export {
  Entity,
  grantType,
  scope,
  API_URL,
  IDENTITY_PROVIDER,
  REDIRECT_CALLBACK,
  CLIENT_ID,
  BACKEND_URL,
  DID,
  BACKEND_WS,
  eidasCertificatePassword
};
