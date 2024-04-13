import axios from "axios";

const BASE_URL = "https://medical360-d65d823d7d75.herokuapp.com/auth";

// const BASE_URL = "http://localhost:3000/auth"

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Enable credentials
});

export const login = (email, password) => {
  return api.post("/login", { email, password });
};

export const logout = () => api.get("/logout");

export const loggedIn = () => api.get("/loggedIn");

// export const register = (data) => api.post("/register")

export default {
  login,
  logout,
  loggedIn,
};
