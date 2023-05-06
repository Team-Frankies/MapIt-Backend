import mongoose from 'mongoose';

// * * THIS MIGHT CHANGE IN THE FUTURE * *
const mongoDB = process.env.DOCKER_DB_URI || 'mongodb://127.0.0.1/develop' || process.env.MONGODB_URL

//'mongodb://user:password@mongo:27017/develop?authSource=admin';
// mongodb://127.0.0.1/develop

export async function connectDB() {
  try {
    await mongoose.connect(mongoDB);
    console.log('Connection to MongoDB \x1b[42m OK \x1b[0m');
  } catch (error) {
    console.log('Connection to MongoDB \x1b[41m ERROR \x1b[0m');
    console.log(error);
  }
}
