import axios from "axios";
import toast from "react-hot-toast";

export const http = axios.create({
  baseURL: `http://localhost:3000/api`,
  // timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // console.log(error.response.data.message);
    toast.error(error.response.data.message);
    // console.log(error);
    // return Promise.resolve(error.response);
    return Promise.reject(error);
  }
);