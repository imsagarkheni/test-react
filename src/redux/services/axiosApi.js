import axios from "axios";
import { baseurl } from "../../api/baseUrl";

export const apiInstance = axios.create({
  baseURL: baseurl,
});
apiInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
