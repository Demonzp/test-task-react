import axios, { AxiosInstance, AxiosResponse } from 'axios';

class AxiosService {
  private static baseURL = 'https://api.giphy.com/v1/gifs';
  axios: AxiosInstance;
  private static instance: AxiosService;

  private constructor() {
    this.axios = axios.create({
      baseURL: AxiosService.baseURL,
    });
  }

  static getInstance() {
    if (AxiosService.instance) {
      return this.instance;
    }
    this.instance = new AxiosService();
    return this.instance;
  }

  async get<T>(path:string, params:any):Promise<AxiosResponse<T>>{
    return await this.axios.get<T>(path, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        ...params
      }
    });
  }
}

const axiosService = AxiosService.getInstance();

export default axiosService;