
import mongoose from 'mongoose';

const db = async () => {
  try {
    await mongoose.connect("MONGO_URI=mongodb+srv://bvaishali382_db_user:7XbF0uac84ASCK5t@cluster0.iif7bjq.mongodb.net/myDatabase?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Server is connected to the Database");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

export default db;