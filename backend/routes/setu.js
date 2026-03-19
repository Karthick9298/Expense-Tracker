import express from 'express';
import { createConsent, handleWebhook, getTransactions,getConsentStatus } from '../controllers/setuController.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// Protected — user must be logged in
router.post('/consent/create', protect, createConsent);

// Public — Setu calls this directly (no auth)
router.post('/webhook', handleWebhook);

// Protected — frontend fetches transactions for dashboard
router.get('/transactions', protect, getTransactions);

router.get('/consent/status', protect, getConsentStatus);

export default router;