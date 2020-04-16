import * as dotenv from 'dotenv';
// importing .env variables
dotenv.config();

const BearerToken = "eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QiLCJqa3UiOiJodHRwczovL3dhbGxldGFwaS1kZXYudmlkY2hhaW4ubmV0L2Vic2l0cnVzdGVkYXBwL3B1YmxpYy1rZXlzLyIsImtpZCI6ImVic2ktd2FsbGV0In0.eyJzdWIiOiJVbml2ZXJzaXR5IG9mIEJhcmNlbG9uYSIsImlhdCI6MTU4NjcyMzMyMiwiZXhwIjoxNTg2ODA5NzIyLCJhdWQiOiJlYnNpLXdhbGxldCIsImRpZCI6ImRpZDplYnNpOjB4ZjkwZDNDNWE4MUM2NUU5OUQ4MGFlNzc1MkI4ZjAzNTkxZDE1YjMxNCIsImVudGVycHJpc2VOYW1lIjoiVW5pdmVyc2l0eSBvZiBCYXJjZWxvbmEiLCJub25jZSI6ImJhcmNlbG9uYV91bml2ZXJzaXR5In0.D1jNJwaSg3dQ57lOcyxFMLsGyyY2WhwCYdd92Y5BDud56lqfM_JzOzL_nxDhw6Sj4hCJeSrY-Png4iwwpzpUKg";
const DID = "did:ebsi:0xf90d3C5a81C65E99D80ae7752B8f03591d15b314";
const Name = "University of Barcelona";

const BACKEND_URL= process.env.BACKEND_URL
const API_URL = "https://walletapi-dev.vidchain.net/wallet/";

export { 
    BearerToken,
    DID,
    Name,
    BACKEND_URL,
    API_URL
}