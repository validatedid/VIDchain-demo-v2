const dotenv = require('dotenv')
// importing .env variables
dotenv.config();

const API_URL = "https://dev.api.vidchain.net/api/v1";
const IDENTITY_PROVIDER = process.env.REACT_APP_IDENTITY_PROVIDER || "https://dev.api.vidchain.net";
const REDIRECT_CALLBACK = process.env.REACT_APP_REDIRECT_CALLBACK || "https://dev.api.vidchain.net/demo/callback";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://dev.api.vidchain.net";

//Legal Entity
const Entity = {
    "iss": "YourUniversity",
    "aud": "vidchain-api",
    "nonce": "z-0427dc2515b1",
    "callbackUrl": BACKEND_URL + "/backenddemo/presentation/validation"
};

//Entity in Base-64
const grantType = "urn:ietf:params:oauth:grant-type:jwt-bearer";
const scope = "vidchain profile test entity";

const CLIENT_ID = "university-test";
const CLIENT_NAME = "YourUniversity";
const CLIENT_SECRET = "secret";

export {
    Entity, 
    grantType,
    scope,
    API_URL,
    BACKEND_URL,
    IDENTITY_PROVIDER,
    REDIRECT_CALLBACK,
    CLIENT_ID,
    CLIENT_SECRET
}