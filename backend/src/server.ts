import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";

import app from "./app";


console.log('PORT:', process.env.PORT);
console.log('MONGO_CONNECTION_STRING:', process.env.MONGO_CONNECTION_STRING);

const port = process.env.PORT|| 8888;

if (!process.env.MONGO_CONNECTION_STRING) {
  console.error("Error: MONGO_CONNECTION_STRING is not defined in the environment variables.");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    app.listen(port, () => console.log(`Server running on port: ${port}`));
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });


