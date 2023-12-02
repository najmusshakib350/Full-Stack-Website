import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
  path: "./config.env",
});

import app from "./app";

// //Database Connection Code Start

const DDATABASE_URL = process.env.DATABASE_URL as string;
const DATABASE_PASS = process.env.DATABASE_PASSWORD as string;
const DB_URL = DDATABASE_URL.replace("<password>", DATABASE_PASS);
const db = mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("database is connected");
  })
  .catch((error) => {
    console.log("database is not connected");
  });

//Database Connection Code is end

//Start server
const port = process.env.PORT || 7000;
const server = app.listen(port, () => {
  console.log(`This port number is ${port}`);
});
