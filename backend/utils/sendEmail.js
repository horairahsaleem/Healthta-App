import nodemailer from 'nodemailer';

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export const sendVerificationEmail = async (email, token) => {
  const transporter = createTransporter();

  // ✅ Backend URL for auto-verification
  const verificationUrl = `${process.env.BACKEND_URL}/api/v1/verify-email/${token}`;

  const mailOptions = {
    from: '"Healthta" <horairahsaleem7864@gmail.com>',
    to: email,
    subject: 'Verify Your Healthta Account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Welcome to Healthta!</h2>
        <p>Please click the button below to verify your email address instantly:</p>
        <a href="${verificationUrl}" 
           style="background-color: #2563eb; color: white; padding: 12px 24px; 
                  text-decoration: none; border-radius: 5px; display: inline-block;">
          Verify Email
        </a>
        <p>If the button doesn't work, copy and paste this link:</p>
        <p>${verificationUrl}</p>
      </div>
    `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully to:', email);
    return result;
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    throw error;
  }
};


export const sendWelcomeEmail = async (user) => {
  const transporter = createTransporter();

  const mailOptions = {
from: '"Healthta" <horairahsaleem7864@gmail.com>',
    to: user.email,
    subject: 'Welcome to Healthta!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Welcome to Healthta, ${user.firstName}!</h2>
        <p>Your account has been successfully created and verified.</p>
        
        <h3>What you can do now:</h3>
        <ul>
          <li>📅 Book doctor appointments</li>
          <li>💊 Manage your medications</li>
          <li>🏥 Access health records</li>
          <li>📞 Online consultations</li>
        </ul>
        
        <p>Start your health journey today!</p>
        <a href="${process.env.FRONTEND_URL}/dashboard" 
           style="background-color: #2563eb; color: white; padding: 12px 24px; 
                  text-decoration: none; border-radius: 5px; display: inline-block;">
          Go to Dashboard
        </a>
      </div>
    `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Welcome email sent to:', user.email);
    return result;
  } catch (error) {
    console.error('❌ Welcome email failed:', error);
    throw error;
  }
};


// import {createTransport} from "nodemailer"

// export const sendEmail= async(to,subject,text,replyTo)=>{

//     const transporter = createTransport(

//         {
//             host: process.env.SMTP_HOST,
//             port: Number(process.env.SMTP_PORT),
//             auth: {
//               user: process.env.SMTP_USER,
//               pass: process.env.SMTP_PASS,
//             },
//               logger: true,   // logs everything
//               debug: true,    // show detailed connection logs
//           }
//     );

//    await transporter.sendMail({
//   from: '"CourseBundler" <horairahsaleem7864@gmail.com>',
//   to,
//   subject,
//   text,
//   ...(replyTo && { replyTo }),   // only add replyTo if it's provided
// });

// }

