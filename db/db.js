import mongoose from 'mongoose';

const db = async () => {
    await mongoose.connect(`mongodb://127.0.0.1:27017/Ride`).then( () => {
        console.log(`Server is connected to the Database`);
    }
    ).catch((err) => {
        console.log(err);
    });
};

export default db;