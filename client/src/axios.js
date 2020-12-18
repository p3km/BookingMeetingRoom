import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:12345/api"
});

export default api;