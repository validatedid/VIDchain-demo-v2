const PORT = process.env.PORT || 3021
const API_URL = "https://dev.api.vidchain.net/api/v1/";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3022";
const BASE_URL = process.env.BASE_URL || "http://localhost:3021";

//Legal Entity
const Entity = {
  "iss": "Your City - Test",
  "aud": "vidchain-api",
  "nonce": "z-0427dc2515b1",
  "callbackUrl": "https://1dac7b01be34.ngrok.io/presentation/validation"
};
//Entity in Base-64
const assertion = "ewogICJpc3MiOiAiWW91ciBDaXR5IC0gVGVzdCIsCiAgImF1ZCI6ICJ2aWRjaGFpbi1hcGkiLAogICJub25jZSI6ICJ6LTA0MjdkYzI1MTViMSIsCiAgImNhbGxiYWNrVXJsIjogImh0dHBzOi8vMWRhYzdiMDFiZTM0Lm5ncm9rLmlvL3ByZXNlbnRhdGlvbi92YWxpZGF0aW9uIgp9";
const grantType = "urn:ietf:params:oauth:grant-type:jwt-bearer";
const scope = "vidchain profile test entity";

const DID = "did:vid:0xb02d86Cc91724A74674114b00d3952Fb002fcd33";

export { 
  PORT,
  API_URL,
  CLIENT_URL,
  BASE_URL,
  assertion,
  grantType,
  scope,
  DID
}