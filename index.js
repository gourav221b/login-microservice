const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require("mongoose");

const port= process.env.PORT||5000;
app.use(express.json());

const  cors = require('cors');
app.use(cors())

// ROUTES
const authRoute= require('./routes/auth')
const userRoute =require('./routes/user')


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));


  app.use('/api/auth',authRoute)
  app.use('/api/user',userRoute)
app.listen(port,()=>
{
    console.log(`server started at ${port}`)
})