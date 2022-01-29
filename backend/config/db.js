import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      // useCreateIndex: true,
    });
    console.log(
      `MONGODB CONNECTED: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    console.log(`ERROR: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};
export default connectDB;
