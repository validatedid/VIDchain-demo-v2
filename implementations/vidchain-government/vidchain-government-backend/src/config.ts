// CONFIG PROJECT FILE
import * as dotenv from "dotenv";

// importing .env variables
dotenv.config();

const PORT = process.env.PORT || 3021;
const API_URL = "https://dev.api.vidchain.net/api/v1/";
const BASE_URL =
  process.env.BASE_URL || "https://dev.api.vidchain.net/demo/governmentbackend";
const WS_URL = process.env.WS_URL ||  "https://dev.api.vidchain.net/";

//Legal Entity
const Entity = {
  iss: "Government of Freedonia",
  aud: "vidchain-api",
  nonce: "z-0427dc2515b1",
  callbackUrl: BASE_URL + "/presentation/validation",
};
const grantType = "urn:ietf:params:oauth:grant-type:jwt-bearer";
const scope = "vidchain profile test entity";

const DID = "did:vid:0xfB5390914b110BEB6c0B250CB59b23E156B68e29";

export { PORT, API_URL, BASE_URL, Entity, grantType, scope, DID, WS_URL };
