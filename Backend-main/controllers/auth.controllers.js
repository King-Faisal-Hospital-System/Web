import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { signIn, supplierLogin } from "../services/auth.services.js";

export const register = async (req, res) => {
  const { fullname, username, email, phone_number, password, role } = req.body;
  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { username }, { phone_number }],
    });
    if (existingUser)
      return res.status(403).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(12));

    const user = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
      phone_number,
      role,
      isVerified: role === "ADMIN",
    });

    await user.save();
    return res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;
  if (!role) return res.status(400).json({ message: "Role not found" });

  try {
    let user;

    if (role === "ADMIN" || role === "STOCK_MANAGER") {
      user = await signIn(email, password, role);
    } else {
      user = await supplierLogin(email, password, role);
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    
    return res.status(200).json({
      message: "Login successful",
      user,
      token: user.token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    return res.clearCookie("token").status(200).json({ message: "Logged out" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
