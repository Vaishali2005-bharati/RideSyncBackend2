
import mongoose from 'mongoose';

const db = async () => {
  try {
    await mongoose.connect("mongodb+srv://bvaishali382_db_user:V1lwx4iE6jvO8lcd@ride.laxbivd.mongodb.net/?appName=ride", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Server is connected to the Database");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

export default db;