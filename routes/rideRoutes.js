import express from 'express';
import {createRide} from '../controllers/rideController.js';

const router = express.Router();

router.post('/createRide', createRide);

export default router;