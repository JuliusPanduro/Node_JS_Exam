import express from "express";
const app = express();

//for parsing JSON
app.use(express.json());

import path from "path";
app.use(express.static(path.resolve("../client/public")));

import "dotenv/config";
import session from "express-session"
const sessionMiddleware = session({
    secret: process.env.SESSSION_SECRET,
    resave: false,
    saveUninitialized: true
  });
app.use(sessionMiddleware); 

import cors from "cors";
app.use(cors());

import rateLimit from "express-rate-limit";
const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 9999, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

import http from "http";
const server = http.createServer(app);

import { Server } from "socket.io";
const io = new Server(server);

const wrap = middleware => (socket,next) => middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));

const users = {};

io.on('connection', (socket) => {
  socket.on('new-user',name =>{
    users[socket.id] = name;
    socket.broadcast.emit('user-connected', name)
  })
   socket.on('chat-message', message => {
    socket.broadcast.emit('chat-message',{message: message, name: users[socket.id]})
  });
  socket.on('disconnect',() =>{
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
});


import router from "./routers/userRouter.js";
app.use(router,authLimiter);

//For default fallback
app.get('*', (req, res) => {
  res.sendFile(path.resolve("../client/public/index.html"));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () =>{
    console.log("Server is running on port: ",PORT);
});