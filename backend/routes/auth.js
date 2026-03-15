import express from 'express';
import { body, validationResult } from 'express-validator';
import {
  registerSendOtp,
  registerVerifyOtp,
  loginSendOtp,
  loginVerifyOtp,
} from '../controllers/authController.js';

const router = express.Router();

// Middleware to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array()[0].msg });
  }
  next();
};

// --- Registration ---
router.post(
  '/register/send-otp',
  [
    body('fullName').trim().notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('dob').notEmpty().withMessage('Date of birth is required'),
    body('phone')
      .trim()
      .matches(/^[6-9]\d{9}$/)
      .withMessage('Valid 10-digit phone number is required'),
    body('address').trim().notEmpty().withMessage('Address is required'),
    body('city').trim().notEmpty().withMessage('City is required'),
    body('state').trim().notEmpty().withMessage('State is required'),
  ],
  validate,
  registerSendOtp
);

router.post(
  '/register/verify-otp',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('otp')
      .trim()
      .isLength({ min: 6, max: 6 })
      .withMessage('OTP must be 6 digits'),
  ],
  validate,
  registerVerifyOtp
);

// --- Login ---
router.post(
  '/login/send-otp',
  [body('email').isEmail().withMessage('Valid email is required')],
  validate,
  loginSendOtp
);

router.post(
  '/login/verify-otp',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('otp')
      .trim()
      .isLength({ min: 6, max: 6 })
      .withMessage('OTP must be 6 digits'),
  ],
  validate,
  loginVerifyOtp
);

export default router;
