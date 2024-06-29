import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config';
import cors from 'cors'
import Auth from './Routes/Auth.js';
const myapp = express()
myapp.use(cors())


mongoose.connect(process.env.MONGO_URI).then(()=>{console.log("database connection established")})
myapp.use(express.json())
myapp.get('/',(req, res)=>{
    res.json({"success":"server Running"});
})
myapp.use(Auth);
myapp.listen(3000,()=>{console.log('listening on port 4000' )})

export default myapp;