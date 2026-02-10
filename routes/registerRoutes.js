import express from 'express';
import userModel from './../models/userModel.js';
import { body } from 'express-validator';
import { registerUser } from "../controllers/userController.js"
const router = express.Router();

router.post('/', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage(' Password cannot be less than 6 characters'),
    body('number').isLength({min: 10, max: 10 }).withMessage('Phone Number Cannot be less than 10 Numbers'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),

], 
    registerUser );

   

    export default router;

   
