const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

//middlewares..

app.use(cors());

app.use(express.json());

// connecting mongoDB...

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => console.error("mongoDB connection error", err));

//Routes...

app.use("/api/notes", require("./routes/notes"));

// Temporary route for checking whether the server is on live
app.get("/", (req, res) => {
  res.send("API is working....");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`);
});
