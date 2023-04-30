import mongoose from 'mongoose';

const mongoDB = process.env.MONGODB_URL || 'mongodb://127.0.0.1/develop';

export async function connectDB() {
  try {
    await mongoose.connect(mongoDB);
    console.log('Connection to MongoDB \x1b[42m OK \x1b[0m');
  } catch (error) {
    console.log('Connection to MongoDB \x1b[41m ERROR \x1b[0m');
    console.log(error);
  }
}
