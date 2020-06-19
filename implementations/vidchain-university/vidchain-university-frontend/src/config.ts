const dotenv = require('dotenv')
// importing .env variables
dotenv.config();

//Legal Entity
const Entity = {
    "iss": "YourUniversity",
    "aud": "vidchain-api",
    "nonce": "z-0427dc2515b1",
    "callbackUrl": "http://aef054a898eb.ngrok.io/backenddemo/presentation/validation"
};

//Entity in Base-64
const assertion = "ewogICAgImlzcyI6ICJZb3VyVW5pdmVyc2l0eSIsCiAgICAiYXVkIjogInZpZGNoYWluLWFwaSIsCiAgICAibm9uY2UiOiAiei0wNDI3ZGMyNTE1YjEiLAogICAgImNhbGxiYWNrVXJsIjogImh0dHA6Ly9hZWYwNTRhODk4ZWIubmdyb2suaW8vYmFja2VuZGRlbW8vcHJlc2VudGF0aW9uL3ZhbGlkYXRpb24iCn0=";
const grantType = "urn:ietf:params:oauth:grant-type:jwt-bearer";
const scope = "vidchain profile test entity";

const CLIENT_ID = "university-test";
const CLIENT_NAME = "YourUniversity";
const CLIENT_SECRET = "secret";

const API_URL = "https://dev.api.vidchain.net/api/v1";
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