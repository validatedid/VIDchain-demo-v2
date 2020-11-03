// CONFIG PROJECT FILE
import * as dotenv from "dotenv";

// importing .env variables
dotenv.config();

const PORT = process.env.PORT || 9091;
const API_URL = process.env.API_URL || "undefined";
const BASE_URL = process.env.BASE_URL || "undefined";
const WS_URL = process.env.WS_URL || "undefined";
const API_KEY = process.env.API_KEY || "undefined";
const IDENTITY_PROVIDER = process.env.IDENTITY_PROVIDER;

//Legal Entity
const Entity = {
  iss: "AOC",
  aud: "vidchain-api",
  nonce: "z-0427dc2515b1",
  callbackUrl: BASE_URL + "/presentation/validation",
  apiKey: API_KEY
};
const grantType = "urn:ietf:params:oauth:grant-type:jwt-bearer";
const scope = "vidchain profile entity";
//const scope = "vidchain profile test entity";

const DID = "did:vid:0x7BA121a4ae5A78995d4942e099aDC55842eA40B6";

export { PORT, API_URL, BASE_URL, Entity, grantType, scope, DID, WS_URL, IDENTITY_PROVIDER };
