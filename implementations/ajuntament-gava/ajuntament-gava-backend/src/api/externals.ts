import axios, { AxiosResponse, AxiosRequestConfig } from "axios";


async function post(
    data: any,
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> {
    console.log(`POST: ${url}`);
    console.log(data);
    try {
      const response = await axios.post(url, null, {params: data});
      console.log("AXIOS POST RESPONSE: ");
      console.log(response.data);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  export { post };
