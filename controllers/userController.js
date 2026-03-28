import userModel from "../models/userModel.js";
import { createUser } from "../services/userService.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";


const registerUser = async( req, res, next) => {

     try{
         const { fullName , email, number, password, vehicleDetails } = req.body;

    const isUserAlready = await userModel.findOne({ email});

    if(isUserAlready)
        return res.status(402).json({ message: 'User Already Exist'});


const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({
         firstName: fullName.firstName, lastName: fullName.lastName, email, number, password: hashedPassword, vehicleType: vehicleDetails.vehicleType , vehicleColor: vehicleDetails.vehicleColor, numberPlate: vehicleDetails.numberPlate, capacity: vehicleDetails.capacity
    });

    const token = user.generateAuthToken();

        res.status(200).json({
      token,
      userId: user._id, // ✅ send userId to frontend
    });
     } catch(err) {
        console.log( " Error is in the register method");
        console.error(err);
         return res.status(500).json({ message: "Server error" });
     }
   
}

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await userModel.findByIdAndDelete(userId); // ✅ use userModel

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting user", error: err.message });
  }
};

//  const loginUser = async (req, res, next) => {

//     const errors = validationResult(req);

//     if( !errors.isEmpty())
//         return res.status(400).json({message: errors.array() });

//     try {
//          const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password required" });
//   }

//   const user = await userModel.findOne({ email });
//   if (!user) return res.status(404).json({ message: "User not found" });

//       console.log("Plain password:", password);
//     console.log("Hashed password:", user.password);

//   const isMatch = await user.comparePassword(password);
//   if (!isMatch) 
//     return res.status(401).json({ message: "Invalid credentials" });

//   return res.status(200).json({ message: "Login successful" });
//     } catch (err){
//         console.error("Error is in the Login Method");
//         console.error(err);
//     }
  
    
// }
const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Explicitly select password
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    
    const token = user.generateAuthToken();

   return res.status(200).json({
      message: "Login successful",
      token,
      userId: user._id, // ✅ send userId
    });
  } catch (err) {
    console.error("Error is in the Login Method");
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token"); 
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Logout failed", error: err.message });
  }
};

export {
    loginUser,
    registerUser,
    logout,
    deleteUser,
   
}
