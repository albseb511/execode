/* eslint-disable no-console */
import axios from "axios";

let interceptorEnabled = false;

if (process.env.NODE_ENV !== "production") {
  interceptorEnabled = true;
}

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL
});

axiosInstance.interceptors.request.use(request => {
  if (interceptorEnabled) {
    console.log(`Request: ${request.method} ${request.baseURL}${request.url}`);
    console.log("payload:", request.data);
  }
  return request;
});

axiosInstance.interceptors.response.use(
  response => {
    if (interceptorEnabled) {
      console.log("Response Status: ", response.status);
      console.log("Response Summary: ", response.data.summary);
      console.log("Response Content: ", response.data);
    }
    return response;
  },
  error => {
    if (interceptorEnabled) console.log(error.name);
    return error;
  }
);

export default axiosInstance;
