import {
    PROFILE,
    SETPROFILE,
    PROFILE_PIC,
  } from "../../api/constApi";
  import authHeader, { imageHeader } from "./authHeader";
  import { apiInstance } from "./axiosApi";
  
  export const profile = () => {
    return apiInstance.get(PROFILE, { headers: authHeader() });
  };
  
  export const addProfile = (payload) => {
    return apiInstance.post(SETPROFILE, payload, { headers: authHeader() });
  };
  
  export const addProfilePic = (payload) => {
    return apiInstance.post(PROFILE_PIC, payload, { headers: imageHeader() });
  };
  