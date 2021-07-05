const express = require('express');

const server = express();



const logger = require("./middlewares/logger");

const userRouter = require("./users/userRouter.js");

const postRouter = require("./posts/postRouter");

server.use(logger);

server.use(express.json());



server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


//custom middleware



server.use("/api/users",userRouter);
server.use("/api/posts",postRouter);

module.exports = server;
