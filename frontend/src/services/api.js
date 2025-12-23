import axios from "axios";

const API = axios.create({
  baseURL: "https://no-code-ml-backend-fubv.onrender.com/",
});

export default API;
