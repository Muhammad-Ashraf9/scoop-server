const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const authRouter = require("./routes/authenticationRoutes");
const productRouter = require("./routes/productRoutes");
const categoryRouter = require("./routes/categoryRoutes");

const swaggerDocs = require("./utils/swagger");

const app = express();
app.use(helmet());

const port = process.env.PORT || 8080;

// connect to database
mongoose
  .connect(`${process.env.DB_LINK}/${process.env.DB_NAME}`)
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// serve swagger documentation
swaggerDocs(app, port);

// enable cors
app.use(cors());

app.use(morgan("combined"));

//////////////// parsing requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Auth Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/categories", categoryRouter);

app.use(express.static("images"));

/////////////// Not found
app.use((req, res, next) => {
  res.status(404).json({ message: "Resource Not Found" });
});

//////////////// Error handler
app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.statusCode || 500).json({ message: error + "" });
});
