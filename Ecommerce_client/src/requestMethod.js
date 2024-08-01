//FInal Version
import axios from "axios";
import { useSelector } from "react-redux";
const base_URL="https://ecommerce-website-backend-5fvc.onrender.com/"
//const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTBmNDY0NzdkYWI3ODJiZWYxMjk0ZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyMjIzMDQxOCwiZXhwIjoxNzIyMzE2ODE4fQ.oi_O718JX1b044WKP2cL3rYc2PDjCyVNCiqQnwhcYrA"
export const publicRequest = axios.create({
    baseURL:base_URL,
});

export const userRequest = axios.create({
    baseURL:base_URL,
    //header:{Authorization:`Bearer ${token}`}
});

userRequest.interceptors.request.use((config) => {
  const user = useSelector((state) => state.user.currentUser);
  const token = user?.accessToken; // Optional chaining to handle null/undefined
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
