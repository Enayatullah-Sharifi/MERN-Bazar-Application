import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to mongoDB on port ${conn.connection.host}`.cyan.underline.bold)
  } catch (err) {
    console.log(err.red)
    process.exit(1)
  }
} 

export default connectDB;