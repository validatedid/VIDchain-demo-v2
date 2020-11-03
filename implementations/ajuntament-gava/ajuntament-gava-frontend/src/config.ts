const dotenv = require("dotenv");
dotenv.config();

const API_URL = process.env.REACT_APP_API_URL || "undefined";
const IDENTITY_PROVIDER =
  process.env.REACT_APP_IDENTITY_PROVIDER || "undefined";
const VIDCHAIN_IDENTITY_PROVIDER =
  process.env.REACT_APP_VIDCHAIN_IDENTITY_PROVIDER || "undefined";
const REDIRECT_CALLBACK =
  process.env.REACT_APP_REDIRECT_CALLBACK || "undefined";
const VIDCHAIN_REDIRECT_CALLBACK = 
  process.env.REACT_APP_VIDCHAIN_REDIRECT_CALLBACK || "undefined";
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "undefined";
const BACKEND_WS = process.env.REACT_APP_WS_URL || "undefined";
const API_KEY = process.env.REACT_APP_API_KEY || "undefined";


//Legal Entity
const Entity = {
  iss: "AOC",
  aud: "vidchain-api",
  nonce: "z-0427dc2515b1",
  callbackUrl: BACKEND_URL + "/presentation/validation",
  apiKey: API_KEY
};
const DID = "did:vid:0x7BA121a4ae5A78995d4942e099aDC55842eA40B6";

const grantType = "urn:ietf:params:oauth:grant-type:jwt-bearer";
const scope = "vidchain profile entity";
//const scope = "vidchain profile test entity";

//const CLIENT_ID = "city-test";
const CLIENT_ID = "mygov.gava.cat";
const CLIENT_NAME = "Your City";
const CLIENT_SECRET = "25d77ac947b00f8b34162901bc7c078c10bcb702";

const VIDCHAIN_CLIENT_ID = "gava";
const VIDCHAIN_CLIENT_SECRET = "secret";

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
  BACKEND_WS,
  VIDCHAIN_IDENTITY_PROVIDER,
  VIDCHAIN_CLIENT_ID,
  VIDCHAIN_CLIENT_SECRET,
  VIDCHAIN_REDIRECT_CALLBACK,
  DID
};
