import axios from "axios";

const ktsRequest = axios.create({
  // online
<<<<<<< HEAD
  // baseURL: "https://api.sale168.com/api",
  //local
  baseURL: "http://localhost:9000/api",
=======
   baseURL: "https://api.sale168.com/api",
  //local
  //baseURL: "http://localhost:9000/api",
>>>>>>> 7efe25ffa70a818be10c501cbae74c4118dc62f0
});

export default ktsRequest;
