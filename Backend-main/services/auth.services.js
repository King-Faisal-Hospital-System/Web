import User from "../models/user.model.js";
import Supplier from "../models/supplier.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/cookie.utils.js";


export const signIn = async (email, password, role) => {
  const user = await User.findOne({ email, role });
  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;

  const token = generateToken(user);
  return { ...user.toObject(), token };
};


export const supplierLogin = async (email, password, role) => {
  const supplier = await Supplier.findOne({ email, role });
  if (!supplier) return null;
  if (!supplier.isVerified) return null;

  const isPasswordValid = await bcrypt.compare(password, supplier.password);
  if (!isPasswordValid) return null;

  const token = generateToken(supplier);
  return { ...supplier.toObject(), token };
};
