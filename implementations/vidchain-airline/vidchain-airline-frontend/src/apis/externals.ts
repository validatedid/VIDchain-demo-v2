import axios from 'axios';
import queryString from 'query-string';

async function connectWithService(urlAPI, body) {
  try {
    const response = await axios.post(urlAPI, body);
    if (response.status !== 200 && response.status !== 201) {
      return "Error";
    }
    return response;
  } catch (error) {
    return "Error";
  }
}

async function doGetCall(url: string): Promise<any> {
  try {
    const response = await axios.get(url);
    if (response.status !== 200 && response.status !== 201) {
      return "Error";
    }
    return response;
  } catch (error) {
    return "Error";
  }
}

async function doPostCall(data: any, url: string): Promise<any> {
  try {
    const response = await axios.post(url, data);
    if (response.status !== 200 && response.status !== 201) {
      return "Error";
    }
    return response;
  } catch (error) {
    return "Error";
  }
}
async function doPostCallEncoded(data: any, url: string): Promise<any> {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  try {
    const response = await axios.post(url, queryString.stringify(data), {
      headers,
    });
    if (response.status !== 200 && response.status !== 201) {
      return "Error";
    }
    return response;
  } catch (error) {
    return "Error";
  }
}
export {connectWithService, doGetCall, doPostCall, doPostCallEncoded};
