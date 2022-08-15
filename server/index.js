const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const hotelRoute = require('./routes/hotels');
const roomRoute = require('./routes/rooms');
const cookieParser = require("cookie-parser");
const cors = require('cors');

const app = express();

dotenv.config();

const connect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log('Connected To MongoDB')
    }catch(err){
        throw err;
    }
}

mongoose.connection.on('disconnected', ()=>{
    console.log("mongoDB disconnected");
})


//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/rooms", roomRoute);

// Error Handling Middleware
app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong~!";
    return res.status(errorStatus).json({
        success : false,
        status : errorStatus,
        message : errorStatus,
        stack : err.stack,
    });
})


app.listen(8800, ()=>{
    connect();
    console.log("connect to server..")
})