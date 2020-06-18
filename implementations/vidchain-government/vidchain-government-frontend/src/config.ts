const dotenv = require('dotenv')
// importing .env variables
dotenv.config();

const API_URL = "https://dev.api.vidchain.net/api/v1/";
const IDENTITY_PROVIDER = process.env.REACT_APP_IDENTITY_PROVIDER || "https://dev.api.vidchain.net";

const REDIRECT_CALLBACK = process.env.REACT_APP_REDIRECT_CALLBACK || "https://dev.api.vidchain.net/demo/callback";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3021/demo/api";

//Legal Entity
const Entity = {
  "iss": "Your City - Test",
  "aud": "vidchain-api",
  "nonce": "z-0427dc2515b1",
  "callbackUrl": BACKEND_URL + "/presentation/validation"
};

const grantType = "urn:ietf:params:oauth:grant-type:jwt-bearer";
const scope = "vidchain profile test entity";

const DID = "did:vid:0xb02d86Cc91724A74674114b00d3952Fb002fcd33";


//const CLIENT_ID = "city-test";
const CLIENT_ID = "city";
const CLIENT_NAME = "Your City";
const CLIENT_SECRET = "secret";



export { 
    Entity,
    grantType,
    scope,
    API_URL,
    IDENTITY_PROVIDER,
    REDIRECT_CALLBACK,
    CLIENT_ID,
    CLIENT_SECRET,
    BACKEND_URL,
    DID
}