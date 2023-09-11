import { GETPRODUCT,ADDPRODUCT } from "../../api/constApi";
import { apiInstance } from "./axiosApi";
import authHeader from "./authHeader";


export const getProduct = (payload) => {
  return apiInstance.post(GETPRODUCT,payload, { headers: authHeader() });
};
export const addProduct = (payload) => {
  return apiInstance.post(ADDPRODUCT, payload, { headers: authHeader() });
};
