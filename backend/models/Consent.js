import mongoose from 'mongoose';

const consentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  consentId: { type: String, required: true, unique: true },
  sessionId: { type: String, default: null },
  status: {
    type: String,
    enum: ['PENDING', 'ACTIVE', 'REJECTED', 'REVOKED', 'PAUSED', 'EXPIRED'],
    default: 'PENDING',
  },
  consentUrl: { type: String },
}, { timestamps: true });

export default mongoose.model('Consent', consentSchema);