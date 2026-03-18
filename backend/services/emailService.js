const sendOtpEmail = async (toEmail, toName, otp, purpose) => {

  // ✅ DEV MODE: don't send email
  if (process.env.ENVIRNOMENT === 'development') {
    console.log("====== OTP EMAIL (DEV MODE) ======");
    console.log("To:", toEmail);
    console.log("Name:", toName);
    console.log("Purpose:", purpose);
    console.log("OTP:", otp);
    console.log("=================================");

    return; // stop here
  }


  const subject =
    purpose === 'register'
      ? 'Verify your ExpenseIQ account'
      : 'Your ExpenseIQ login OTP';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body { font-family: Inter, Arial, sans-serif; background: #f4f7ff; margin: 0; padding: 0; }
          .container { max-width: 480px; margin: 40px auto; background: #fff; border-radius: 12px; padding: 40px; box-shadow: 0 4px 24px rgba(37,99,235,0.08); }
          .logo { color: #2563eb; font-size: 22px; font-weight: 800; margin-bottom: 24px; }
          .logo span { color: #1d4ed8; }
          h2 { color: #111827; font-size: 20px; margin-bottom: 8px; }
          p { color: #6b7280; font-size: 15px; line-height: 1.6; }
          .otp-box { background: #eff6ff; border: 2px dashed #2563eb; border-radius: 10px; text-align: center; padding: 20px; margin: 28px 0; }
          .otp { font-size: 40px; font-weight: 800; color: #2563eb; letter-spacing: 8px; }
          .expiry { color: #9ca3af; font-size: 13px; margin-top: 8px; }
          .footer { color: #d1d5db; font-size: 12px; margin-top: 32px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">Expense<span>IQ</span></div>
          <h2>${purpose === 'register' ? 'Welcome to ExpenseIQ!' : 'Login Verification'}</h2>
          <p>Hi ${toName || 'there'},</p>
          <p>${purpose === 'register'
      ? 'Thank you for signing up! Please use the OTP below to verify your email address and complete your registration.'
      : 'Use the OTP below to securely log in to your ExpenseIQ account.'
    }</p>
          <div class="otp-box">
            <div class="otp">${otp}</div>
            <div class="expiry">This OTP expires in 5 minutes</div>
          </div>
          <p>If you didn't request this, please ignore this email.</p>
          <div class="footer">© ${new Date().getFullYear()} ExpenseIQ. All rights reserved.</div>
        </div>
      </body>
    </html>
  `;

  const emailBody = {
    sender: {
      name: 'ExpenseIQ',
      email: process.env.BREVO_SENDER_EMAIL,
    },
    to: [{ email: toEmail, name: toName || toEmail }],
    subject: subject,
    htmlContent: htmlContent,
  };

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailBody),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Brevo API error: ${error.message}`);
  }
};

export { sendOtpEmail };
