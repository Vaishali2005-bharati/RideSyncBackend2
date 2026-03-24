// controllers/mapController.js
import axios from "axios";
import userModel from  '../models/userModel.js';

  // it is used to find the Route 
const getRoute = async (req, res) => {
  try {
    const { start, end } = req.query; // ✅ GET query params
    console.log("start:", start, "end:", end);

    const response = await axios.get(
      `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${process.env.ORS_API_KEY}&start=${start}&end=${end}`
    );

    const coordinates = response.data.features[0].geometry.coordinates;
    const summary = response.data.features[0].properties.summary;

    return res.json({ coordinates, summary });
  } catch (err) {
    console.error("ORS Error:", err.response?.data || err.message);
    return res.status(500).json({ error: "Failed to fetch route" });
  }
};

// It is used to find the match among the drivers and passengers. 
const getMatches = async (req, res) => {
  const { userId, role, location, destination } = req.body;
  console.log( 'It is the getMatches from the map Controller. UserId:', userId, 'Role:', role, 'Location: ', location, 'destination :', destination);

  if (role == "driver") {
   const passengers = await userModel.find({
  role: "passenger",
  origin: {
    $geoWithin: {
      $centerSphere: [location.coordinates, 5000 / 6378137] 
      // 5000 meters / Earth radius in meters
    }
  },
  destination: {
    $geoWithin: {
      $centerSphere: [destination.coordinates, 5000 / 6378137]
    }
  }
});
    console.log( 'paasengers are here a12 : ', passengers);
    return res.json(passengers);
  }

  if (role == "passenger") {
    const drivers = await userModel.find({
      role: 'driver',
        origin: {
    $geoWithin: {
      $centerSphere: [location.coordinates, 5000 / 6378137] 
      // 5000 meters / Earth radius in meters
    }
  },
  destination: {
    $geoWithin: {
      $centerSphere: [destination.coordinates, 5000 / 6378137]
    }
  }
});
    console.log('It is the driver fetch list a13 : ', drivers)
    return res.json(drivers);
  }

  return res.json([]); // role none
};

export { getRoute,
  getMatches,
 };