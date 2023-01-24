import axios from "axios";

const accessToken = localStorage.getItem("accessToken");

const dataServer = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 100000,
  // headers: {
  //   Authorization: `Bearer ${accessToken}`,
  // },
});

dataServer.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`
  return config
})
dataServer.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;
    if (status === 401) {
      window.location.replace = "/login";
      window.location.reload();
    } else {
      return Promise.reject(error);
    }
  }
);

export { dataServer };
