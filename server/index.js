import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import PropertyRoutes from "./routes/property_routes.js"
import userRoute from './routes/UserRoute.js'
import adminRoutes from './routes/AdminRoute.js'


const app  = express();

app.use(cors());
app.use(express.json());

dotenv.config();


// initial route for homepage when app is started
app.get('/',(req,res)=> { 
    console.log('Initial route is being called.');  
    res.send('Welcome User! Lets get started')
});

app.use('/property' , PropertyRoutes);
app.use('/users',userRoute);
app.use('/admin' , adminRoutes);


mongoose.connect(process.env.CONNECTION_URL) 
.then(app.listen(process.env.PORT , ()=> { console.log(`Server is running on port: http://localhost:${process.env.PORT}`); }))
.catch((error) => console.error(error.message) );



