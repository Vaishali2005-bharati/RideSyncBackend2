import userModel from "../models/userModel.js";
import { createUser } from "../services/userService.js";
import { validationResult } from "express-validator";


const registerUser = async( req, res, next) => {

     
    const { fullName , email, number, password, vehicleDetails } = req.body;

    const isUserAlready = await userModel.findOne({ email});

    if(isUserAlready)
        return res.status(402).json({ message: 'User Already Exist'});

    const hashedPassword = await userModel.hashPassword(password);

    const user = await createUser({
         firstName: fullName.firstName, lastName: fullName.lastName, email, number, password: hashedPassword, vehicleType: vehicleDetails.vehicleType , vehicleColor: vehicleDetails.vehicleColor, numberPlate: vehicleDetails.numberPlate, capacity: vehicleDetails.capacity
    });

    const token = user.generateAuthToken();

    res.status(200).json({token: token});


}

 const loginUser = async (req, res, next) => {

    const errors = validationResult(req);

    if( !errors.isEmpty())
        return res.status(400).json({message: errors.array() });


    const { email, password } = req.body;

    const user = await userModel.findOne( { email }).select('+password');

    if( !user)
        return res.status(401).json({ message: 'Email or password doesnot match to the database ' });

    const isMatch = await user.comparePassword(password);

    if(!isMatch)
        return res.status(401).json({ message: 'Email or password cannot match to the database.' });

    const token = user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json(token);

    
}




export {
    loginUser,
    registerUser,
   
}