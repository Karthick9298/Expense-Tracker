import { Worker } from 'bullmq';
import { redisConnection } from '../config/redis.js';
import { sendOtpEmail } from '../services/emailService.js';

const emailWorker = new Worker(
  'email',
  async (job) => {
    const { toEmail, toName, otp, purpose } = job.data;
    console.log(`[emailWorker] Processing job ${job.id} — sending ${purpose} OTP to ${toEmail}`);
    await sendOtpEmail(toEmail, toName, otp, purpose);
    console.log(`[emailWorker] Job ${job.id} done — email sent to ${toEmail}`);
  },
  {
    connection: redisConnection,
    concurrency: 5, // process up to 5 email jobs in parallel
  }
);

emailWorker.on('completed', (job) => {
  console.log(`[emailWorker] Job ${job.id} completed successfully`);
});

emailWorker.on('failed', (job, err) => {
  console.error(`[emailWorker] Job ${job?.id} failed: ${err.message}`);
});

emailWorker.on('error', (err) => {
  console.error('[emailWorker] Worker error:', err.message);
});

export default emailWorker;
