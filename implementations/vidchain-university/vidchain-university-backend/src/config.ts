const PORT = process.env.PORT || 3023;
const API_URL = "https://dev.api.vidchain.net/api/v1/";
const BASE_URL =
  process.env.BASE_URL || "https://dev.api.vidchain.net/demo/universitybackend";
const WS_URL = "https://dev.api.vidchain.net/";
//const BASE_URL = "http://5k3ieae7ac7.ngrok.io/demo/universitybackend";
//const WS_URL= "http://5k3ieae7ac7.ngrok.io/"

//Legal Entity
const Entity = {
  iss: "ACME University",
  aud: "vidchain-api",
  nonce: "z-z-0427dc2515b1",
  callbackUrl: BASE_URL + "/presentation/validation",
};
const grantType = "urn:ietf:params:oauth:grant-type:jwt-bearer";
const scope = "vidchain profile test entity";
const DID = "did:vid:0x10624BfA14bB2b1d14b474612539FaCFa36877EA";

export { PORT, API_URL, BASE_URL, Entity, grantType, scope, DID, WS_URL };
