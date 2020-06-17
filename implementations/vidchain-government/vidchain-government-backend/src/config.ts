const PORT = process.env.PORT || 3021
const API_URL = "https://dev.api.vidchain.net/api/v1/";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3022";
const BASE_URL = process.env.BASE_URL || "http://localhost:3021";

//Legal Entity
const Entity = {
  "iss": "Your City - Test2",
  "aud": "vidchain-api",
  "nonce": "z-0427dc2515b1",
  "callbackUrl": "https://1dac7b01be34.ngrok.io/presentation/validation"
};
//Entity in Base-64
const assertion = "ewogICJpc3MiOiAiWW91ciBDaXR5IC0gVGVzdDIiLAogICJhdWQiOiAidmlkY2hhaW4tYXBpIiwKICAibm9uY2UiOiAiei0wNDI3ZGMyNTE1YjEiLAogICJjYWxsYmFja1VybCI6ICJodHRwczovLzFkYWM3YjAxYmUzNC5uZ3Jvay5pby9wcmVzZW50YXRpb24vdmFsaWRhdGlvbiIKfQ==";
const grantType = "urn:ietf:params:oauth:grant-type:jwt-bearer";
const scope = "vidchain profile test entity";


export { 
  PORT,
  API_URL,
  CLIENT_URL,
  BASE_URL,
  assertion,
  grantType,
  scope
}