const PORT = process.env.PORT || 3021
const API_URL = "https://dev.api.vidchain.net/api/v1/";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3022";
const BASE_URL = process.env.BASE_URL || "http://localhost:3021";

//Legal Entity
const Entity = {
  "iss": "Your City - Test",
  "aud": "vidchain-api",
  "nonce": "z-0427dc2515b1",
  "callbackUrl": "http://localhost:3021/presentation/validation"
};
//Entity in Base-64
const assertion = "ewogICAgImlzcyI6ICJZb3VyIENpdHkgLSBUZXN0IiwKICAgICJhdWQiOiAidmlkY2hhaW4tYXBpIiwKICAgICJub25jZSI6ICJ6LTA0MjdkYzI1MTViMSIsCiAgICAiY2FsbGJhY2tVcmwiOiAiaHR0cDovL2xvY2FsaG9zdDozMDIxL3ByZXNlbnRhdGlvbi92YWxpZGF0aW9uIgogIH0=";
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