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
import { Prisma } from "./prisma/prisma";
const app = express();

// default middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

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

app.get("/", (req, res, next) => {
  next(httpError(401, "Please login to view this page."));

  //   return httpError[400]
});

io.on("connection", (socket) => {
  // console.log('new connection')
  // // console.log(socket)
  socket.on("message", (message) => {
    // // console.log(message)
    io.to(socket.id).emit(
      "message",
      `${socket.id.substr(0, 2)} said ${message}`
    );
  });

  socket.on("send-changes", (data) => {
    // console.log(data,"broadcasting it")
    // io.to(socket.id).emit('receive-changes',`${socket.id.substr(0,2)} made chnged ${JSON.stringify(data)}`)
    socket.broadcast.to(data.id).emit("receive-changes", data.delta);
  });

  socket.on("join-doc", async (data: { id: string; key: string }) => {
    const { id, key } = data;
    const checkDocExists = await Prisma.docs.findFirst({
      where: {
        id,
        key,
      },
      select: { id: true },
    });

    if (!checkDocExists) {
      return socket.emit("join-doc-error", "Document not found");
    }

    socket.emit("message", "Document found");
    socket.emit("message", "Joining document room " + checkDocExists.id);
    // // console.log(socket.rooms.entries())

    socket.join(checkDocExists.id);
    const roomSize = io.sockets.adapter.rooms.get(checkDocExists.id)?.size || 0;
    socket.broadcast
      .to(checkDocExists.id)
      .emit("update-realtime-collaborators", roomSize);
  });

  socket.on("del-doc", async (data: { id: string }) => {
    socket.broadcast.to(data.id).emit("delete-doc", data.id);
    socket.leave(data.id);
  });

  socket.on("leave-doc", async (id) => {
    "Leaving document room";
    socket.leave(id);
    const roomSize = io.sockets.adapter.rooms.get(id)?.size || 0;
    socket.broadcast.to(id).emit("update-realtime-collaborators", roomSize);
  });

  socket.on("update-doc-title", (data: { id: string; title: string }) => {
    socket.broadcast.to(data.id).emit("update-doc-title", data.title);
  });

  socket.on(
    "update-content",
    async (data: { id: string; key: string; content: string }) => {
      // console.log(data)
      const result = await Prisma.docs.update({
        where: {
          id: data.id,
          // key:data.key
        },
        data: {
          content: JSON.stringify(data.content),
        },
        select: { id: true },
      });
    }
  );
});

app.use(errMiddle);

export default httpServer;
