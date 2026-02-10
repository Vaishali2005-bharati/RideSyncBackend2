import { validationResult } from "express-validator";
import userModel from "../models/userModel.js"; // adjust path as needed
import jwt from 'jsonwebtoken'

const createRide = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty())
    return res.status(405).json({
      message: "Validation error in createRide",
      errors: error.array()
    });

  const { start, destination, location } = req.body;

  if (!start || !destination|| !location)
    return res.status(400).json({ message: "Start Address , Destination Address and Location are required" });

   const token = req.headers.authorization?.split(' ')[1]; // remove "Bearer"

  if (!token) return res.status(401).json({ message: "Token missing, Pleae Login Again." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // use your secret
    const userId = decoded.id; // or whatever field you encoded

    // Now you can use userId safely
    console.log("User ID from token:", userId);

    // Continue with ride creation logic...
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(403).json({ message: "Invalid token" });
  }


  try {
    const { lat, lng } = location;

    try {
    await userModel.findByIdAndUpdate(userId, {
      location: {
        type: "Point",
        coordinates: [lng, lat]
      }
    });

    res.status(200).json({ message: "Location updated successfully" });
  } catch (err) {
    console.error("Error updating location:", err);
    res.status(500).json({ message: "Server error" });
  }

    // GeoJSON format: [longitude, latitude]
    const coordinates = [lng, lat];

    // Find users within 500 meters
    const nearbyUsers = await userModel.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: coordinates
          },
          $maxDistance: 500 // meters
        }
      }
    });

    res.status(200).json({
      message: "Ride created successfully",
      nearbyUsers: nearbyUsers.map(user => ({
        id: user._id,
        name: user.name,
        location: user.location
      }))
    });
  } catch (err) {
    console.error("Error in createRide:", err);
    res.status(500).json({ message: "Server error in createRide" });
  }

  
};

export {
    createRide,
}