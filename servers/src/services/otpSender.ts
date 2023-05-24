const nodemailer = require("nodemailer");

const otpSender = async (otp: any, email: String) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASS,
    },
  });

  let info = await transporter
    .sendMail({
      from: "'The Secret'" + process.env.SMTP_USERNAME,
      to: email,
      subject: "OTP to Verify email",
      html: `<b><h1>The Secret - Make the things Secret</h1>
        <h2>${otp} is the otp to verify your email.</h2>
        </b>`,
    })
    .catch((err: any) => {
      console.log(err);
    });
};

export default otpSender;
