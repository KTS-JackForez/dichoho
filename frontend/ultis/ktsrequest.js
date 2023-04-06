import axios from "axios";

const ktsRequest = axios.create({
  // online
  baseURL: "https://api.sale168.vn/api",
  //local
  // baseURL: "http://localhost:9000/api",
});

export default ktsRequest;
