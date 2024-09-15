import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import morgan from "morgan";
import httpError from "http-errors"; 
import { errMiddle } from "./middlewares/err.middleware";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./Routes/AuthRoutes";
import docRouter from "./Routes/DocRoutes";
const app = express();


// default middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    }));

app.use(cookieParser());


// routes
app.use("/auth", authRouter);
app.use("/docs", docRouter);


// #universal
app.use("*", (req, res, next) => {
    next(httpError(404, "Route not found"));
});





const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
  },
});


app.get("/", (req, res,next) => {
    next(httpError(401, 'Please login to view this page.'))
    
//   return httpError[400]
});


io.on("connection",(socket)=>{
    console.log('new connection')
    // console.log(socket)
    socket.on('message',(message)=>{
        // console.log(message)
        io.to(socket.id).emit('message',`${socket.id.substr(0,2)} said ${message}`)
    })

    socket.on("send-changes",(data)=>{
        console.log(data,"broadcasting it")
        // io.to(socket.id).emit('receive-changes',`${socket.id.substr(0,2)} made chnged ${JSON.stringify(data)}`)
        socket.broadcast.emit("receive-changes",data)

    })



})

app.use(errMiddle)


export default httpServer