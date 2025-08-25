"use client";

import { UserIcon, EnvelopeIcon, PhoneIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/lib/api";

export default function CreateAccount() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"ADMIN" | "STOCK_MANAGER">("STOCK_MANAGER");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!firstName || !lastName || !username || !email || !phone || !password) {
      setError("All fields are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/register", {
        fullname: `${firstName} ${lastName}`,
        username,
        email,
        phone_number: phone,
        password,
        role, 
      });

      console.log("Account created:", res.data);
      alert(`Account created successfully as ${role}`);
      router.push("/signin");
    } catch (err: any) {
      console.error(err);
   
      const message = err.response?.data?.message || "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 font-sans">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-black mb-2">Create Account</h1>
        <p className="text-center text-gray-600 mb-8">KFH Inventory Management</p>

    
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setRole("ADMIN")}
            className={`px-4 py-2 rounded-md ${role === "ADMIN" ? "bg-teal-800 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Admin
          </button>
          <button
            onClick={() => setRole("STOCK_MANAGER")}
            className={`px-4 py-2 rounded-md ${role === "STOCK_MANAGER" ? "bg-teal-800 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Stock Manager
          </button>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
         
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  className="w-full pl-10 py-3 bg-gray-100 rounded-md border-none text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  className="w-full pl-10 py-3 bg-gray-100 rounded-md border-none text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>
          </div>

        
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="johndoe"
                className="w-full pl-10 py-3 bg-gray-100 rounded-md border-none text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>

        
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@gmail.com"
                className="w-full pl-10 py-3 bg-gray-100 rounded-md border-none text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="relative">
              <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+250 788 123 456"
                className="w-full pl-10 py-3 bg-gray-100 rounded-md border-none text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full pl-10 py-3 bg-gray-100 rounded-md border-none text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="button"
            onClick={handleSignUp}
            disabled={loading}
            className="w-full py-3 bg-teal-800 text-white font-semibold rounded-md"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/signin" className="text-teal-800 hover:underline">Sign In</a>
        </p>
      </div>
    </div>
  );
}
