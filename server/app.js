import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config';
import cors from 'cors'
import Auth from './Routes/Auth.js';
import Posts from './Routes/Posts.js';
import Users from './Routes/User.js';
const myapp = express()
myapp.use(cors())


mongoose.connect(process.env.MONGO_URI).then(()=>{console.log("database connection established")})
myapp.use(express.json())
myapp.get('/',(req, res)=>{
    res.json({"success":"server Running"});
})
myapp.use(Auth);
myapp.use(Posts);
myapp.use(Users);

myapp.listen(3000,()=>{console.log('listening on port 4000' )})

export default myapp;