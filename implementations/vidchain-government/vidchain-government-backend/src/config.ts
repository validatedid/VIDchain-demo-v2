const PORT = process.env.PORT || 3021
const API_URL = "https://dev.api.vidchain.net/api/v1/";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3022";
const BASE_URL = process.env.BASE_URL || "http://localhost:3021";

//Legal Entity
const Entity = {
  "iss": "Your City",
  "aud": "vidchain-api",
  "nonce": "z-0427dc2515b1"
};
//Entity in Base-64
const assertion = "ewogICAgImlzcyI6ICJZb3VyIENpdHkiLAogICAgImF1ZCI6ICJ2aWRjaGFpbi1hcGkiLAogICAgIm5vbmNlIjogInotMDQyN2RjMjUxNWIxIgp9";
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