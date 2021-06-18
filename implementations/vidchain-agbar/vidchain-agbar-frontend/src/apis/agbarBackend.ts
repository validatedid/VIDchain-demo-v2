import axios from "axios";
import * as config from "../config";
import { Presentation } from "../interfaces/dtos";


async function getToken(body: any) {
  try {
    const response = await axios.post(
      `${config.BACKEND_URL}/auth/vidchain`,
      body
    );
    if (response.status !== 200 && response.status !== 201) {
      return "Error";
    }
    return response.data;
  } catch (error) {
    return "Error";
  }
}

export { getToken };
