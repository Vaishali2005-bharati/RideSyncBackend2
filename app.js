import express from "express";
const app = express();

import userModel from "./models/userModel.js";

import axios from 'axios';
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
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "https://ridesync1.netlify.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("It is the server");
});

// user
app.use('/user', userRoutes);

app.use('/register', registerRoutes);
app.use('/rides', rideRoutes);

//maps
app.use('/maps', mapRoutes);

export default app;
