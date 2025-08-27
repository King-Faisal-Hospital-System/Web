import axios from "axios";

export interface User {
  _id: string;
  fullname: string;
  isVerified: boolean;
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/admin";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});

// Fetch all users
export const fetchAllUsers = async (): Promise<User[]> => {
  const res = await api.get("/users");
  return res.data;
};

// Approve or revoke a user
export const verifyUser = async (userId: string, action: "approve" | "reject") => {
  const res = await api.patch(`/verify-user/${userId}`, { action });
  return res.data;
};
