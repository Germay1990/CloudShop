const config = require("config");
const mongoose = require("mongoose");
const express = require("express");
const products = require("./routers/products");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/products", products);

mongoose
  .connect(config.get("atlasDBStringUrl"))
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((err) => {
    console.log("could not connect to mongoDB", err);
  });

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
