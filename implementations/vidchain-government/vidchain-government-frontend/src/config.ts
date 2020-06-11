const dotenv = require('dotenv')
// importing .env variables
dotenv.config();

const Entity = {
    "iss": "City of Barcelona",
    "aud": "vidchain-api",
    "nonce": "z-0427dc2515b1"
};
//Entity in Base-64
const assertion = "ewogICAgImlzcyI6ICJDaXR5IG9mIEJhcmNlbG9uYSIsCiAgICAiYXVkIjogInZpZGNoYWluLWFwaSIsCiAgICAibm9uY2UiOiAiei0wNDI3ZGMyNTE1YjEiCn0=";
//Legal Entity
const grantType = "urn:ietf:params:oauth:grant-type:jwt-bearer";
const scope = "vidchain profile test entity";

const CLIENT_ID = "barcelona-city-demo2";
const CLIENT_SECRET = "secret";

// const BACKEND_URL= process.env.REACT_APP_BACKEND_URL || "http://localhost:3021"
const API_URL = "https://dev.api.vidchain.net/api/v1/";
const IDENTITY_PROVIDER = process.env.IDENTITY_PROVIDER || "https://dev.api.vidchain.net";

const REDIRECT_CALLBACK = process.env.REDIRECT_CALLBACK || "https://dev.api.vidchain.net/demo/callback";

const REDIS_URL = process.env.REDIS_URL || ""
const REDIS_PORT: number = Number(process.env.REDIS_PORT) || 6379

export { 
    assertion,
    grantType,
    scope,
    API_URL,
    IDENTITY_PROVIDER,
    REDIRECT_CALLBACK,
    CLIENT_ID,
    CLIENT_SECRET,
    REDIS_URL,
    REDIS_PORT
}