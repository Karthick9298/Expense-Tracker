import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  consentId: { type: String, required: true },
  txnId: { type: String },
  type: { type: String, enum: ['DEBIT', 'CREDIT'] },
  mode: { type: String },   // UPI, NEFT, IMPS etc
  amount: { type: Number },
  currentBalance: { type: Number },
  narration: { type: String },
  transactionDate: { type: Date },
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);