import axios from "axios";

const ktsRequest = axios.create({
  // online
  // baseURL:'http://api.ktscorp.vn/api'

  //local
  baseURL: "http://localhost:9000/api",
});

export default ktsRequest;
