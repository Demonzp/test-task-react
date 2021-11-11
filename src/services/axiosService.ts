import axios, { AxiosInstance } from 'axios';

class AxiosService {
  private static baseURL = 'https://api.giphy.com/v1/gifs/trending';
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
}

const axiosService = AxiosService.getInstance();

export default axiosService;