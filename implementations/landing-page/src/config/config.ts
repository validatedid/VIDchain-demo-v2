const dotenv = require("dotenv");
// importing .env variables
dotenv.config();
const GOVERNMENT_URL = process.env.REACT_APP_GOVERNMENT_URL || "undefined";
const UNIVERSITY_URL = process.env.REACT_APP_UNIVERSITY_URL || "undefined";

export {
    GOVERNMENT_URL,
    UNIVERSITY_URL
};