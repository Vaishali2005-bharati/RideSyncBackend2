
import mongoose from 'mongoose';

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Server is connected to the Database");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

export default db;