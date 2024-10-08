import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import PropertyRoutes from "./routes/property_routes.js"
import userRoute from './routes/UserRoute.js'
import adminRoutes from './routes/AdminRoute.js'

//import chatRoutes from './routes/ChatRoutes.js'
import bodyParser from 'body-parser';
import http from 'http';
import axios from 'axios'
import { Server } from 'socket.io';
import fileUpload from "express-fileupload";


const app  = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' })); // Optional for URL-encoded form data
app.use(fileUpload()); // Ensure this is applied before multer and form processing

dotenv.config();



// initial route for homepage when app is started
app.get('/',(req,res)=> { 
    console.log('Initial route is being called.');  
    res.send('Welcome User! Lets get started')
});

app.use('/property' , PropertyRoutes);
app.use('/users',userRoute);
app.use('/admin' , adminRoutes);
//app.use('/chat',chatRoutes)




mongoose.connect(process.env.CONNECTION_URL) 
.then(() => {
    app.listen(process.env.PORT , ()=> 
        { 
            console.log(`Server is running on port: http://localhost:${process.env.PORT}`); 
        })})

  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });




