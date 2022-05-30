import express from "express";
const app = express();

//for parsing JSON
app.use(express.json());

//For using forms in frontend
app.use(express.urlencoded({ extended: true }));

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

import router from "./routers/userRouter.js";
app.use(router,authLimiter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log("Server is running on port: ",PORT);
});