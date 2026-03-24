import userModel from "../models/userModel.js";

const createUser = async ({
    firstName, lastName, email, number, password, vehicleType, vehicleColor, numberPlate, capacity
}) => {
    if( !firstName || !email || !number || !password )
        throw new Error ("All Fields are required");

    const user = userModel.create({
        fullname: {
            firstName,
            lastName,
        },
        email,
        number,
        password,
        vehicleDetails: {
            vehicleType,
            vehicleColor,
            numberPlate,
            capacity,
        },
    role: "none", // ✅ default role
    origin: { type: "Point", coordinates: [] },       // ✅ must include coordinates
    destination: { type: "Point", coordinates: [] },  // ✅ must include coordinates
  });

    return user;
}

export  { createUser };