const dotenv = require('dotenv')
// importing .env variables
dotenv.config();

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

// const CLIENT_ID = "barcelona-city-demo2";
const CLIENT_ID = "city-test";
// const CLIENT_ID = "city";
const CLIENT_NAME = "Your City";
const CLIENT_SECRET = "secret";

// const BACKEND_URL= process.env.REACT_APP_BACKEND_URL || "http://localhost:3021"
const API_URL = "https://dev.api.vidchain.net/api/v1/";
const IDENTITY_PROVIDER = process.env.REACT_APP_IDENTITY_PROVIDER || "https://dev.api.vidchain.net";

const REDIRECT_CALLBACK = process.env.REACT_APP_REDIRECT_CALLBACK || "https://dev.api.vidchain.net/demo/callback";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3021";


export { 
    assertion,
    grantType,
    scope,
    API_URL,
    IDENTITY_PROVIDER,
    REDIRECT_CALLBACK,
    CLIENT_ID,
    CLIENT_SECRET,
    BACKEND_URL
}