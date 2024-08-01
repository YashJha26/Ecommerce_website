//FInal Version
import axios from "axios";
const base_URL="https://ecommerce-website-backend-5fvc.onrender.com/api"
//const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTBmNDY0NzdkYWI3ODJiZWYxMjk0ZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyMjIzMDQxOCwiZXhwIjoxNzIyMzE2ODE4fQ.oi_O718JX1b044WKP2cL3rYc2PDjCyVNCiqQnwhcYrA"
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const token = currentUser?.accessToken;
export const publicRequest = axios.create({
    baseURL:base_URL,
})

export const userRequest = axios.create({
    baseURL:base_URL,
    header:{Authorization:`Bearer ${token}`}
})
