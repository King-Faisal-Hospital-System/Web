import api from "@/lib/api";

export interface User {
  _id: string;
  fullname: string;
  isVerified: boolean;
  createdAt: string;
}

// Fetch all users
export const fetchAllUsers = async (): Promise<User[]> => {
  const res = await api.get("/admin/users");
  return res.data;
};

// Approve or revoke a user
export const verifyUser = async (userId: string, action: "approve" | "reject") => {
  const res = await api.patch(`/admin/verify-user/${userId}`, { action });
  return res.data;
};

export const getCurrentUser = async () => {
  try {
    const res = await api.get("/users/me");
    return res.data.user
  } catch (error : any) {
    throw new Error(error)
  }
}
