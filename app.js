import express from "express";
const app = express();

import cors from 'cors';
import db from './db/db.js';
import dotenv from "dotenv";
import  userRoutes from "./routes/userRoutes.js";
import  registerRoutes  from './routes/registerRoutes.js';
import mapRoutes from './routes/mapRoutes.js';
import rideRoutes from './routes/rideRoutes.js';

dotenv.config();
db();

   app.use(cors({
      origin: "https://ridesync1.netlify.app", 
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true
    }));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("It is the server");
});

// user
app.use('/login', userRoutes);
app.use('/register', registerRoutes);
app.use('/rides', rideRoutes);

//maps
app.use('/maps', mapRoutes);



export default app;
