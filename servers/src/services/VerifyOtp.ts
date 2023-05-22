import crypto from "crypto";
const verifyOtp = (user: { hash: string; email: string; otp: Number }) => {
  const key = process.env.OTP_SECRET;
  const [hashvalue, expiry] = user.hash.split(".");
  const data = `${user.email}.${user.otp}.${expiry}`;

  if (Date.now() > parseInt(expiry)) return false;

  const newHash = crypto
    .createHmac("sha256", key || "")
    .update(data)
    .digest("hex");

  //   console.log(newHash);

  if (hashvalue === newHash) {
    // console.log("hash matched");
    return true;
  }
  // console.log("hash not matched");
  return false;
};

export default verifyOtp;
