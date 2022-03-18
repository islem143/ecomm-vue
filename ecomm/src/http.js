import axios from "axios";
let ins = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token")
      ? "Bearer " + localStorage.getItem("token")
      : null,
  },
});
//axios.defaults.withCredentials = true;

export default ins;
