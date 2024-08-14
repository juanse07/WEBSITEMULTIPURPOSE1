import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";
//const app = require("./app");
import app from "./app";
//import env from "./env";

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


// mongoose.connect(process.env.MONGO_CONNECTION_STRING!) 
//    .then(() =>{
//      console.log("Mongoose connected")
//          app.listen(port,() => console.log("server running on port: " + port));
//     })
//     .catch(console.error); 
   

   // console.log('MONGO_CONNECTION_STRING:', process.env.MONGO_CONNECTION_STRING);

    // if (env.MONGO_CONNECTION_STRING) {
    //   mongoose.connect(env.MONGO_CONNECTION_STRING)
    //     .then(() => {
    //       console.log("Mongoose connected");
    //       app.listen(port, () => console.log(`Server running on port: ${port}`));
    //     })
    //     .catch((error) => {
    //       console.error("Failed to connect to MongoDB:", error);
    //     });
    // } else {
    //   console.error("MONGO_CONNECTION_STRING is not defined");
    // }