import { createTransport } from "nodemailer";
import env from "../env";

const transporter= createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: "80b26e001@smtp-brevo.com",
        pass: env.SMTP_PASSWORD,


    },
    tls: {
        // Don't fail on invalid certs
        rejectUnauthorized: false
    }

});

// export async function sendVerificationCode(toEmail: string, verificationCode: string) {
//     await tranporter.sendMail({
//         from: "noreply@handyjuan.com",
//         to: toEmail,
//         subject: "Please verify your email",
//         html: `<p>this is yuo verification code. It will expire in 12 hours. <strong>${verificationCode}</strong></p>`,
//     });
// }

export async function sendVerificationCode(toEmail: string, verificationCode: string) {
    try {
      const info = await transporter.sendMail({
        from: "juansegz07s@gmail.com",
        to: toEmail,
        subject: "Please verify your email",
        html: `<p>This is your verification code. It will expire in 12 hours. <strong>${verificationCode}</strong></p>`,
      });
      console.log('Email sent successfully:', info.response);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
  export async function sendPasswordResetEmail(toEmail: string, verificationCode: string) {
    try {
      const info = await transporter.sendMail({
        from: "juansegz07s@gmail.com",
        to: toEmail,
        subject: "Reset your password",
        html: `<p>A password reset request has been sent for thi account.
        use this verification code to reset your password.
        It will expire in 10 minute.</p> 
        <p><strong>${verificationCode}</strong></p>
        if You didnt request a password reset, you can ignore this email.`,
        
      });
      console.log('Email sent successfully:', info.response);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }

  }