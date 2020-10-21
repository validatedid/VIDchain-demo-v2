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
  iss: "Government of Freedonia",
  aud: "vidchain-api",
  nonce: "z-0427dc2515b1",
  callbackUrl: BASE_URL + "/presentation/validation",
  apiKey: API_KEY
};
const grantType = "urn:ietf:params:oauth:grant-type:jwt-bearer";
const scope = "vidchain profile entity";
//const scope = "vidchain profile test entity";

const DID = "did:vid:0xfB5390914b110BEB6c0B250CB59b23E156B68e29";

export { PORT, API_URL, BASE_URL, Entity, grantType, scope, DID, WS_URL, IDENTITY_PROVIDER };
