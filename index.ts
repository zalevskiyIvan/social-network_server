import express from "express";
import http from "http";
import { sequelize } from "./db";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "config";
import models from "./mvc/models/models";

import authRouter from "./mvc/routes/authRouter";
import postRouter from "./mvc/routes/postsRouter";
import conversationRouter from "./mvc/routes/conversationRouter";
import userRouter from "./mvc/routes/userRouter";
import messageRouter from "./mvc/routes/messageRouter";

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

app.use(
  cors({
    credentials: true,
    origin: config.get("origin"), // fix to deploy version
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/conversations", conversationRouter);
app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);

type userType = {
  socketId: string;
  userId: number;
};

let users = [] as userType[];

const addUser = (userId: number, socketId: string) => {
  !users.some((user: userType) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId: string) => {
  users = users.filter((user: userType) => user.socketId !== socketId);
};

const getUser = (userId: number) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket: any) => {
  socket.on("addUser", (userId: number) => {
    console.log("ADD_USER", userId);
    addUser(userId, socket.id);
  });

  socket.on(
    "sendMessage",
    ({
      senderId,
      reciverId,
      text,
    }: {
      senderId: number;
      reciverId: number;
      text: string;
    }) => {
      console.log(users);
      const user = getUser(reciverId);
      const date = Date.now();
      // @ts-ignore
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
        createdAt: date,
      });
    }
  );

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

const PORT = process.env.PORT || 3001;

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    server.listen(PORT, () =>
      console.log("server has been started on port", PORT)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
