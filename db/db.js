import mongoose from 'mongoose';

const db = async () => {
    await mongoose.connect(`mongodb+srv://bvaishali382_db_user:7XbF0uac84ASCK5t@cluster0.iif7bjq.mongodb.net/?appName=Cluster0`).then( () => {
        console.log(`Server is connected to the Database`);
    }
    ).catch((err) => {
        console.log(err);
    });
};

export default db;