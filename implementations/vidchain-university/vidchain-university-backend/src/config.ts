const dotenv = require("dotenv");
// importing .env variables
dotenv.config();
const PORT = process.env.PORT || 3023;
const API_URL = process.env.API_URL || "undefined";
const BASE_URL =
  process.env.BASE_URL || "undefined";;
const WS_URL = process.env.WS_URL || "undefined";
const API_KEY = process.env.API_KEY || "undefined";

//Legal Entity
const Entity = {
  iss: "ACME University",
  aud: "vidchain-api",
  nonce: "z-z-0427dc2515b1",
  callbackUrl: BASE_URL + "/presentation/validation",
  apiKey: API_KEY
};
const grantType = "urn:ietf:params:oauth:grant-type:jwt-bearer";
const scope = "vidchain profile entity";
//const scope = "vidchain profile test entity";
const DID = "did:vid:0x10624BfA14bB2b1d14b474612539FaCFa36877EA";

export { PORT, API_URL, BASE_URL, Entity, grantType, scope, DID, WS_URL };
