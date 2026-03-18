import { Queue } from 'bullmq';
import { redisConnection } from '../config/redis.js';

// Single queue for all outbound emails.
// Job data shape: { toEmail, toName, otp, purpose }
const emailQueue = new Queue('email', {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,            // retry up to 3 times on failure
    backoff: {
      type: 'exponential',
      delay: 5000,          // 5 s → 10 s → 20 s
    },
    removeOnComplete: 100,  // keep last 100 completed jobs
    removeOnFail: 200,      // keep last 200 failed jobs
  },
});

export default emailQueue;

