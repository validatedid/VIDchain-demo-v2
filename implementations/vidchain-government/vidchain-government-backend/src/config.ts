const PORT = process.env.PORT || 3021
const API_URL = "https://dev.api.vidchain.net/api/v1/";
const BASE_URL = process.env.BASE_URL || "https://dev.api.vidchain.net/demo/governmentbackend";
//const BASE_URL = "http://5a7a2991a594.ngrok.io/demo/governmentbackend";
//Legal Entity
const Entity = {
  "iss": "Your City - Test",
  "aud": "vidchain-api",
  "nonce": "z-0427dc2515b1",
  "callbackUrl": BASE_URL+"/presentation/validation"
};
const grantType = "urn:ietf:params:oauth:grant-type:jwt-bearer";
const scope = "vidchain profile test entity";

const DID = "did:vid:0xfB5390914b110BEB6c0B250CB59b23E156B68e29";

export { 
  PORT,
  API_URL,
  BASE_URL,
  Entity,
  grantType,
  scope,
  DID
}