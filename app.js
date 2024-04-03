const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/authenticationRoutes");

const swaggerDocs = require("./utils/swagger");

const server = express();

const port = process.env.PORT || 8080;

// connect to database
mongoose
  .connect(`${process.env.DB_LINK}/${process.env.DB_NAME}`)
  .then(() => {
    server.listen(port, () => {
      console.log(`server is running on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// serve swagger documentation
swaggerDocs(server, port);

// enable cors
server.use(cors());

server.use(morgan("combined"));

//////////////// parsing requests
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//Auth Routes
server.use("/api/v1/auth", authRouter);

server.use(express.static("images"));

/////////////// Not found
server.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

//////////////// Error handler
server.use((error, req, res, next) => {
  console.log(error);
  res.status(error.statusCode || 500).json({ message: error + "" });
});
