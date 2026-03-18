import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import { redisClient } from '../config/redis.js';
import emailQueue from '../queues/emailQueue.js';

// OTP TTL in seconds (5 minutes)
const OTP_TTL = 5 * 60;

// Cookie options for JWT
const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
});

// Redis key helpers
const otpKey = (purpose, email) => `otp:${purpose}:${email.toLowerCase()}`;

// Helper: generate a 6-digit OTP
const generateOtp = () => crypto.randomInt(100000, 999999).toString();

// ---------------------------------------------------------
// POST /api/auth/register/send-otp
// Saves user details + OTP in Redis, queues email dispatch
// ---------------------------------------------------------
const registerSendOtp = async (req, res) => {
  try {
    const { fullName, email, dob, phone, address, city, state } = req.body;

    // Check if email already registered
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: 'This email is already registered. Please log in.' });
    }

    const otp = generateOtp();

    // Store OTP + pending user data in Redis with 5-minute TTL
    await redisClient.set(
      otpKey('register', email),
      JSON.stringify({ otp, pendingUserData: { fullName, email, dob, phone, address, city, state } }),
      'EX',
      OTP_TTL
    );

    // Dispatch email as a background job — API returns immediately
    await emailQueue.add('send-otp', { toEmail: email, toName: fullName, otp, purpose: 'register' });

    return res.status(200).json({ message: 'OTP sent successfully. Please check your email.' });
  } catch (err) {
    console.error('registerSendOtp error:', err);
    return res.status(500).json({ message: 'Failed to send OTP. Please try again.' });
  }
};

// ---------------------------------------------------------
// POST /api/auth/register/verify-otp
// Reads OTP from Redis, creates user, sets cookie
// ---------------------------------------------------------
const registerVerifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const key = otpKey('register', email);

    const raw = await redisClient.get(key);
    if (!raw) {
      return res.status(400).json({ message: 'OTP expired or not found. Please request a new one.' });
    }

    const { otp: storedOtp, pendingUserData } = JSON.parse(raw);

    if (storedOtp !== otp.trim()) {
      return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
    }

    const { fullName, dob, phone, address, city, state } = pendingUserData;

    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      dob,
      phone,
      address,
      city,
      state,
      isVerified: true,
    });

    // Remove OTP from Redis immediately after successful verification
    await redisClient.del(key);

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Set JWT as httpOnly cookie
    res.cookie('token', token, cookieOptions());

    return res.status(201).json({
      message: 'Account created successfully!',
      user: { id: user._id, fullName: user.fullName, email: user.email },
    });
  } catch (err) {
    console.error('registerVerifyOtp error:', err);
    return res.status(500).json({ message: 'Failed to verify OTP. Please try again.' });
  }
};

// ---------------------------------------------------------
// POST /api/auth/login/send-otp
// Checks email exists, stores OTP in Redis, queues email
// ---------------------------------------------------------
const loginSendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'No account found with this email. Please register first.' });
    }

    const otp = generateOtp();

    // Store OTP in Redis with 5-minute TTL
    await redisClient.set(otpKey('login', email), otp, 'EX', OTP_TTL);

    // Dispatch email as a background job
    await emailQueue.add('send-otp', { toEmail: email, toName: user.fullName, otp, purpose: 'login' });

    return res.status(200).json({ message: 'OTP sent to your registered email.' });
  } catch (err) {
    console.error('loginSendOtp error:', err);
    return res.status(500).json({ message: 'Failed to send OTP. Please try again.' });
  }
};

// ---------------------------------------------------------
// POST /api/auth/login/verify-otp
// Reads OTP from Redis, sets cookie
// ---------------------------------------------------------
const loginVerifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const key = otpKey('login', email);

    const storedOtp = await redisClient.get(key);
    if (!storedOtp) {
      return res.status(400).json({ message: 'OTP expired or not found. Please request a new one.' });
    }

    if (storedOtp !== otp.trim()) {
      return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Remove OTP from Redis immediately after successful verification
    await redisClient.del(key);

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Set JWT as httpOnly cookie
    res.cookie('token', token, cookieOptions());

    return res.status(200).json({
      message: 'Login successful!',
      user: { id: user._id, fullName: user.fullName, email: user.email },
    });
  } catch (err) {
    console.error('loginVerifyOtp error:', err);
    return res.status(500).json({ message: 'Failed to verify OTP. Please try again.' });
  }
};

// ---------------------------------------------------------
// POST /api/auth/logout
// Clears the JWT cookie
// ---------------------------------------------------------
const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  });
  return res.status(200).json({ message: 'Logged out successfully.' });
};

export { registerSendOtp, registerVerifyOtp, loginSendOtp, loginVerifyOtp, logout };
