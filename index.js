import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './Routes/userRoute.js';
import productRouter from './Routes/productRouter.js'; // Assuming 'Routes' is a subdirectory of 'index.js'
import jwt, { decode } from "jsonwebtoken"; 
import dotenv from "dotenv"; 

dotenv.config(); 

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => { // middleware
  let token = req.headers["authorization"]; // Fetch the Authorization header
  // Ensure the request proceeds to the next middleware/route handler

  if(token!=null){
    token = token.replace("Bearer ", ""); // Remove 'Bearer ' from the token


    //decode the token 
    jwt.verify(token, "kv-secret-89!", 

      (err,decoded) => {

        if(!err){
req.user=decoded;         }
      }

    )

    
  }
  next(); 

});


const mongoUrl=process.env.MONGO_URL;

mongoose.connect(mongoUrl);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});



app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.listen(3002, () => {
  console.log('Server is running on port 3002');
});