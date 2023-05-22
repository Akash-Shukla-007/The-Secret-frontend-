var jwt = require("jsonwebtoken");

const tokenGenerator = (email: string) => {
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign({ email }, secretKey);
  return token;
};
export default tokenGenerator;
