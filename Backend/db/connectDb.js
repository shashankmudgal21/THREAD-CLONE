import mongoose from 'mongoose'
export const connectDb = async()=>{
    try {
        const conn = mongoose.connect(process.env.MONGO);
        console.log('database is connected');
    } catch (error) {
        console.log(error)
    }
}