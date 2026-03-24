
import express from 'express';
import { body } from 'express-validator';
import { loginUser } from '../controllers/userController.js';
const router = express.Router();
import userModel from '../models/userModel.js';
import { getMatches, getRoute } from '../controllers/mapController.js';

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must contain 6 charcter Long'),
],
     loginUser );

        // Trip update route workking correctly
        router.put("/:id/trip", async (req, res) => {
          try {
            // ✅ Direct debug logs
            console.log("🚀 Trip route hit!");
            console.log("Params ID:", req.params.id);
            console.log("Request Body:", req.body);

            const { origin, destination } = req.body;

            const user = await userModel.findByIdAndUpdate(
              req.params.id,
              { origin, destination },
              { new: true }
            );

            if (!user) {
              console.log("❌ User not found in DB");
              return res.status(404).json({ error: "User not found" });
            }

            console.log("✅ Trip updated successfully for user:", user._id);
            return res.json({
              success: true,
              message: "Trip updated successfully",
              trip: { origin: user.origin, destination: user.destination }
            });
          } catch (err) {
            console.error("❌ Error in trip route:", err.message);
            return res.status(500).json({ error: "Failed to update trip" });
          }
        });
        // It is feeding the null in the location at the time of the logout.  
        router.put("/:id/location", async (req, res) => {
        try {
            const { coordinates } = req.body;

            const updateData = coordinates.length
            ? { location: { type: "Point", coordinates } }
            : { location: null }; // ✅ remove location on logout

            const user = await userModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
            );

           return  res.json(user);
        } catch (err) {
            return res.status(500).json({ error: "Failed to update location" });
        }
        });

        // Role Updation Process // Working correctly
        router.put("/:id/role", async (req, res) => {
          try {
            const { role } = req.body; // "driver" or "passenger"
            const user = await userModel.findByIdAndUpdate(
              req.params.id,
              { role },
              { new: true }
            );
            return res.json(user);
          } catch (err) {
            return res.status(500).json({ error: "Failed to update role" });
          }
        });

        // Getting Route coordinates from the map controller
        router.get('/route', getRoute);

        // it is used to find the match b/w the passengers and riders. 
        router.post('/match', getMatches);

        // it is used to find the role.
              router.get('/findrole/:id', async (req, res) => {
          try {
            const user = await userModel.findById(req.params.id);

            if (!user) {
              return res.status(404).json({ error: "User not found" });
            }

            return res.status(200).json({ role: user.role });
          } catch (err) {
            console.error("Error in findrole route:", err.message);
            return res.status(500).json({ error: "Failed to fetch role" });
          }
        });

        // it is being used for the rating and the feedback.
                router.post("/feedback", async (req, res) => {
          try {
            const { matchId, rating, feedback } = req.body;
            const user = await userModel.findByIdAndUpdate(
              matchId,
              { $push: { reviews: { rating, feedback } } },
              { new: true }
            );
            return res.json({ success: true, reviews: user.reviews });
          } catch (err) {
            return res.status(500).json({ error: "Failed to save feedback" });
          }
        });
        // POST /user/liveLocations
router.post("/liveLocations", async (req, res) => {
  const { ids } = req.body; // array of user _id
  const users = await userModel.find({ _id: { $in: ids } }, { liveLocation: 1, destination: 1, fullname: 1 });
  return res.json(users);
});

            export default router;
    