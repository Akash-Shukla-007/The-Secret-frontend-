import User from "../Schema/userSchema";

const jwt = require("jsonwebtoken");

const AuthMiddleware = (req: any, res: any, next: any) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: "not authorized, token failed" });
    }
  }
  if (!token) {
    res.status(401).json({ message: "not authorized, no token" });
  }
};
``;

export default AuthMiddleware;
