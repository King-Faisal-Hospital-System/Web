import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

export const generateToken = (user) => {
  const payload = {
    id: user._id,
    role: user.role,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15d" });
};
