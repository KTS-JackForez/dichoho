import axios from "axios";

const ktsRequest = axios.create({
  // online
   baseURL: "http://api.sale168.com/api",

  //local
 // baseURL: "http://localhost:9000/api",
});

export default ktsRequest;
