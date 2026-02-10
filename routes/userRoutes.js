
import express from 'express';
import { body } from 'express-validator';
import { loginUser } from '../controllers/userController.js';
const router = express.Router();

router.post('/', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must contain 6 charcter Long'),
],
     loginUser );

    export default router;
    