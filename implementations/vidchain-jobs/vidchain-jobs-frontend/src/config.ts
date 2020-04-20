import * as dotenv from 'dotenv';
// importing .env variables
dotenv.config();

const BearerToken = "eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QiLCJqa3UiOiJodHRwczovL3dhbGxldGFwaS1kZXYudmlkY2hhaW4ubmV0L2Vic2l0cnVzdGVkYXBwL3B1YmxpYy1rZXlzLyIsImtpZCI6ImVic2ktd2FsbGV0In0.eyJzdWIiOiJKb2JzIFNpdGUiLCJpYXQiOjE1ODY3MjMyMTcsImV4cCI6MTU4NjgwOTYxNywiYXVkIjoiZWJzaS13YWxsZXQiLCJkaWQiOiJkaWQ6ZWJzaToweDlGMUZCOWFiYkQ4QzIzOGJGZDdFMDk0NThCQ2FDNjllQjI0OWNjYTYiLCJlbnRlcnByaXNlTmFtZSI6IkpvYnMgU2l0ZSIsIm5vbmNlIjoiam9ic19zaXRlIn0.mHkQNFMWJKZ1b_grQVDV2VOEC7ODXYtcJUVUlgHnru4NnQrwE3Id-ff3kxeg8jnSKlYjgtnjtDvJdD8yXkyBeQ";
const DID = "did:ebsi:0x9F1FB9abbD8C238bFd7E09458BCaC69eB249cca6";
const Name = "Jobs Site";
const nonce = "jobs_site";

const BACKEND_URL= process.env.REACT_APP_BACKEND_URL || "http://localhost:3025"
const API_URL = "https://walletapi-dev.vidchain.net/wallet/";

export { 
    BearerToken,
    DID,
    Name,
    BACKEND_URL,
    API_URL,
    nonce
}
