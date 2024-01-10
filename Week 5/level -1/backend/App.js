const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const { connectToDB } = require("./db/connect");
const { CardRouter } = require("./Routes/Card");

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use("/", CardRouter);
async function start() {
  try {
    await connectToDB(process.env.MONGO_KEY);
    app.listen(PORT, console.log(`Server is running on PORT: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

start();
