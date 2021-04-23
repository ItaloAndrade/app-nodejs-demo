const express = require("express");

const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const favoritoRouter = require("./favoritoRouter");

const app = express();

app.use("/auth/", authRouter);
app.use("/user/", userRouter);
app.use("/favorito/", favoritoRouter);

module.exports = app;