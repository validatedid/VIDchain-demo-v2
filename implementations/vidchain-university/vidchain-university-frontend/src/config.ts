const dotenv = require('dotenv')
// importing .env variables
dotenv.config();

//Legal Entity
const Entity = {
    "iss": "YourUniversity",
    "aud": "vidchain-api",
    "nonce": "z-0427dc2515b1"
};

//Entity in Base-64
const assertion = "ewogICAgImlzcyI6ICJZb3VyVW5pdmVyc2l0eSIsCiAgICAiYXVkIjogInZpZGNoYWluLWFwaSIsCiAgICAibm9uY2UiOiAiei0wNDI3ZGMyNTE1YjEiCn0=";
const grantType = "urn:ietf:params:oauth:grant-type:jwt-bearer";
const scope = "vidchain profile test entity";

const CLIENT_ID = "university-test";
const CLIENT_NAME = "YourUniversity";
const CLIENT_SECRET = "secret";

const API_URL = "https://walletapi-dev.vidchain.net/wallet/";
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