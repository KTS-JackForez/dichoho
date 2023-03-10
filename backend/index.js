import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

//import routes
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import postRoute from "./routes/post.js";
import orderRoure from "./routes/order.js";

//socket
import http from "http"
import {Server} from "socket.io"

//app
const app = express();
dotenv.config();
const PORT = process.env.PORT;
const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: "*",
}
})
//connect to DB
mongoose.set("strictQuery", false);
const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Kết nối thành công tới Database");
    })
    .catch((err) => {
      throw err;
    });
};




io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on("dathang",(data)=>{
    console.log("anh oi co don hang", data)
  })
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors());

//routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/posts", postRoute);
app.use("/api/orders", orderRoure);

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.status || "Có lỗi không xác định";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

//app listener
app.listen(PORT || 8000, () => {
  //connect to DB
  connect();
  //log
  console.log(`Kết nối Server thành công tại cổng ${PORT}`);
  server.listen(9100, () => {
    console.log('listening on *:9100');
  });
});

