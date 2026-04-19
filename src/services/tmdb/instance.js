import axios from "axios";

const API_URL = process.env.REACT_APP_API;
const API_KEY = process.env.REACT_APP_KEY;

export const apiClient = axios.create({
  baseURL: API_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});
