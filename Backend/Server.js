import express from 'express'
import dotenv from 'dotenv'
import {connectDb} from './db/connectDb.js'
import userRouter from './routes/userRoute.js'
import postRouter from './routes/postRoute.js'
import cookieParser from 'cookie-parser'
dotenv.config();
connectDb();
const port = process.env.PORT
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

app.use('/api/users',userRouter);
app.use('/api/post',postRouter)

app.listen(port,()=>{
    console.log(`your server is started at https://localhost:/${port}`)
})


