const dotenv = require('dotenv')
// importing .env variables
dotenv.config();

const BearerToken = "eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QiLCJqa3UiOiJodHRwczovL3dhbGxldGFwaS1kZXYudmlkY2hhaW4ubmV0L2Vic2l0cnVzdGVkYXBwL3B1YmxpYy1rZXlzLyIsImtpZCI6ImVic2ktd2FsbGV0In0.eyJzdWIiOiJDaXR5IG9mIEJhcmNlbG9uYSIsImlhdCI6MTU4NjcyMjk4OSwiZXhwIjoxNTg2ODA5Mzg5LCJhdWQiOiJlYnNpLXdhbGxldCIsImRpZCI6ImRpZDplYnNpOjB4OTFBNzQzMTUyQ2IwYjRCQ2NiMjFkYTY1ZTM4NzMyRTUwMDVlYjkzRSIsImVudGVycHJpc2VOYW1lIjoiQ2l0eSBvZiBCYXJjZWxvbmEiLCJub25jZSI6ImJhcmNlbG9uYSJ9.D9nkns9ZvG3QjEA-n-Ng6Gba2hW05jVrYHcX1SWfLEdWi9qbFwq4IpP6qLIhF_oku59334t67nkJq-650HHCeQ";
const DID = "did:ebsi:0x91A743152Cb0b4BCcb21da65e38732E5005eb93E";
const Name = "City of Barcelona";
const nonce = "barcelona";

const BACKEND_URL= process.env.REACT_APP_BACKEND_URL || "http://localhost:3021"
const API_URL = "https://walletapi-dev.vidchain.net/wallet/";

export { 
    BearerToken,
    DID,
    Name,
    nonce,
    BACKEND_URL,
    API_URL
}