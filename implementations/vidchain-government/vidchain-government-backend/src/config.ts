const PORT = process.env.PORT || 3021
const API_URL = "https://dev.api.vidchain.net/api/v1/";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3022";
const BASE_URL = process.env.BASE_URL || "http://localhost:3021";

const Name = "City of Barcelona";
const nonce = "barcelona";


export { 
  PORT,
  API_URL,
  CLIENT_URL,
  BASE_URL,
  Name,
  nonce
}