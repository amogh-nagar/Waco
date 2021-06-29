const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const bodyparser = require("body-parser");

app.use(bodyparser.json());

app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data,
  });
});

mongoose
  .connect(
    "mongodb+srv://waco:123waco@wacobackend.67619.mongodb.net/database?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(3000);
    console.log("Connected");
  })
  .catch((err) => console.log(err));
