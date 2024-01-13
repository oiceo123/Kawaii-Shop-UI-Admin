import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000,
});

instance.interceptors.request.use(
  (config) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const access_token = localStorage.getItem("access_token");
    if (apiKey) {
      config.headers["X-Api-Key"] = apiKey;
    }
    if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
