import crypto from "crypto";

const createNewOtp = (email: any) => {
  const key = process.env.OTP_SECRET;
  const otp = Math.floor(1000 + Math.random() * 9000);
  const otpValidity = 5 * 60 * 1000;
  const expiry = Date.now() + otpValidity;
  const data = `${email}.${otp}.${expiry}`;
  const hash = crypto
    .createHmac("sha256", key || "")
    .update(data)
    .digest("hex");
  const fullhash = `${hash}.${expiry}`;

  console.log(otp);

  return fullhash;
};
export default createNewOtp;
