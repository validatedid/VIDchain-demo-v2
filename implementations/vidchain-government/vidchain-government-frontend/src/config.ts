const dotenv = require('dotenv')
// importing .env variables
dotenv.config();

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

// const CLIENT_ID = "barcelona-city-demo2";
const CLIENT_ID = "city";
const CLIENT_NAME = "Your City";
const CLIENT_SECRET = "secret";

// const BACKEND_URL= process.env.REACT_APP_BACKEND_URL || "http://localhost:3021"
const API_URL = "https://dev.api.vidchain.net/api/v1/";
const IDENTITY_PROVIDER = process.env.REACT_APP_IDENTITY_PROVIDER || "https://dev.api.vidchain.net";

const REDIRECT_CALLBACK = process.env.REACT_APP_REDIRECT_CALLBACK || "https://dev.api.vidchain.net/demo/callback";


export { 
    assertion,
    grantType,
    scope,
    API_URL,
    IDENTITY_PROVIDER,
    REDIRECT_CALLBACK,
    CLIENT_ID,
    CLIENT_SECRET
}