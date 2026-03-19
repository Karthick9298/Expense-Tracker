import { setuFetch } from '../config/setu.js';
import Consent from '../models/Consent.js';
import Transaction from '../models/Transaction.js';

// POST /api/setu/consent/create
const createConsent = async (req, res) => {
    try {
        const user = req.user; // from protect middleware

        // Check if user already has an active consent
        const existing = await Consent.findOne({ userId: user._id, status: 'ACTIVE' });
        if (existing) {
            return res.status(400).json({ message: 'You already have an active bank link.' });
        }

        const phone = user.phone; // already stored in User model

        const { ok, data } = await setuFetch('/consents', {
            method: 'POST',
            body: JSON.stringify({
                consentDuration: { unit: 'MONTH', value: 1 },
                dataRange: {
                    from: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
                    to: new Date().toISOString(),
                },
                consentTypes: ['PROFILE', 'SUMMARY', 'TRANSACTIONS'],
                consentMode: 'STORE',
                fetchType: 'PERIODIC',
                fiTypes: ['DEPOSIT'],
                frequency: { unit: 'MONTH', value: 1 },   // ← was MONTHLY
                dataLife: { unit: 'MONTH', value: 1 },
                redirectUrl: process.env.SETU_REDIRECT_URL || 'https://example.com/dashboard',
                vua: phone,
                purpose: {
                    code: '102',
                    refUri: 'https://api.rebit.org.in/aa/purpose/102.xml',
                    text: 'Customer spending patterns, budget or other reportings',
                    category: { type: 'Personal Finance' },  // ← was Category (capital C)
                },
            }),
        });

        if (!ok) {
            console.error('Setu createConsent error:', data);
            return res.status(500).json({ message: 'Failed to create consent. Try again.' });
        }

        // Save consent to MongoDB
        await Consent.create({
            userId: user._id,
            consentId: data.id,
            consentUrl: data.url,
            status: 'PENDING',
        });

        return res.status(200).json({ consentUrl: data.url });
    } catch (err) {
        console.error('createConsent error:', err);
        return res.status(500).json({ message: 'Something went wrong.' });
    }
};



// POST /api/setu/webhook
const handleWebhook = async (req, res) => {
    try {
        const { type, consentId, dataSessionId, success, data } = req.body;

        // Always respond 200 immediately — Setu expects a fast ack
        res.status(200).json({ success: true });

        if (!success) {
            console.log(`[webhook] Failed event — type: ${type}, consentId: ${consentId}`);
            return;
        }

        // --- Consent status update ---
        if (type === 'CONSENT_STATUS_UPDATE') {
            const status = data?.status;
            console.log(`[webhook] Consent ${consentId} → ${status}`);

            await Consent.findOneAndUpdate({ consentId }, { status });

            // If user approved → immediately create data session
            if (status === 'ACTIVE') {
                await createDataSession(consentId);
            }
        }

        // --- Session status update ---
        if (type === 'SESSION_STATUS_UPDATE') {
            const sessionStatus = data?.status;
            console.log(`[webhook] Session ${dataSessionId} → ${sessionStatus}`);

            if (sessionStatus === 'COMPLETED' || sessionStatus === 'PARTIAL') {
                await fetchAndSaveTransactions(dataSessionId, consentId);
            }
        }
    } catch (err) {
        console.error('handleWebhook error:', err);
    }
};


const createDataSession = async (consentId) => {
    try {
        const { ok, data } = await setuFetch('/sessions', {
            method: 'POST',
            body: JSON.stringify({ consentId }),
        });

        if (!ok) {
            console.error('[createDataSession] Setu error:', data);
            return;
        }

        const sessionId = data.id;
        console.log(`[createDataSession] Session created: ${sessionId}`);

        // Save sessionId to the consent doc
        await Consent.findOneAndUpdate({ consentId }, { sessionId });
    } catch (err) {
        console.error('[createDataSession] error:', err);
    }
};

const fetchAndSaveTransactions = async (sessionId, consentId) => {
    try {
        const { ok, data } = await setuFetch(`/sessions/${sessionId}`);

        if (!ok) {
            console.error('[fetchAndSaveTransactions] Setu error:', data);
            return;
        }

        const consent = await Consent.findOne({ consentId });
        if (!consent) return;

        // Setu returns an array of FIP payloads
        const fips = data?.payload || [];
        const transactionsToSave = [];

        for (const fip of fips) {
            const rawTxns = fip?.account?.Transactions?.Transaction || [];
            for (const txn of rawTxns) {
                transactionsToSave.push({
                    userId: consent.userId,
                    consentId,
                    txnId: txn.txnId,
                    type: txn.type,           // DEBIT / CREDIT
                    mode: txn.mode,           // UPI, NEFT, IMPS
                    amount: txn.amount,
                    currentBalance: txn.currentBalance,
                    narration: txn.narration,
                    transactionDate: new Date(txn.transactionTimestamp),
                });
            }
        }

        if (transactionsToSave.length > 0) {
            await Transaction.insertMany(transactionsToSave, { ordered: false });
            console.log(`[fetchAndSaveTransactions] Saved ${transactionsToSave.length} transactions`);
        }
    } catch (err) {
        console.error('[fetchAndSaveTransactions] error:', err);
    }
};


// GET /api/transactions
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user._id })
            .sort({ transactionDate: -1 });

        return res.status(200).json({ transactions });
    } catch (err) {
        console.error('getTransactions error:', err);
        return res.status(500).json({ message: 'Failed to fetch transactions.' });
    }
};

const getConsentStatus = async (req, res) => {
    try {
        const consent = await Consent.findOne({
            userId: req.user._id,
            status: 'ACTIVE'
        });
        return res.status(200).json({ hasActive: !!consent });
    } catch (err) {
        return res.status(500).json({ message: 'Failed to check consent status.' });
    }
};

export { createConsent, handleWebhook, getTransactions, getConsentStatus };