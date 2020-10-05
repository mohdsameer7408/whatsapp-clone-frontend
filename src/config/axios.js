import axios from "axios";

const instance = axios.create({
  baseURL: "https://whatsapp-clone-mern-api.herokuapp.com/api",
});

export default instance;
