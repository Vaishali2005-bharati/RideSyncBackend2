
import { query } from "express-validator";
import express from 'express';
import { getAutocompleteSuggestions } from '../controllers/mapController.js';
const router = express.Router();


router.get('/get-suggestions', 
    query('input').isString().withMessage('everything should be in the string.'),
    getAutocompleteSuggestions
);

export default router;