"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn as signInRedux, AccountType } from "../../store/slices/authSlice";

export default function SignIn() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [accountType, setAccountType] = useState<AccountType>("stockManager");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAccountTypeClick = (type: AccountType) => {
    setAccountType(type);
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          role: accountType.toUpperCase(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed.");
        return;
      }

    
      dispatch(signInRedux({ email: data.user.email, accountType, token: data.token }));

      alert(`Signed in as ${accountType}!`);

      router.push(accountType === "admin" ? "/admin/home" : "/stock_manager/home");
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = () => {
    router.push("/signup");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 font-sans">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black mb-2">Welcome Back!</h1>
          <p className="text-lg text-gray-600 mb-8">KFH Inventory Management</p>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => handleAccountTypeClick("admin")}
            className={`px-4 py-2 rounded-md ${
              accountType === "admin" ? "bg-teal-800 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Admin
          </button>
          <button
            onClick={() => handleAccountTypeClick("stockManager")}
            className={`px-4 py-2 rounded-md ${
              accountType === "stockManager" ? "bg-teal-800 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Stock Manager
          </button>
        </div>

        <form className="space-y-4 text-left" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="john@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-3 py-3 bg-gray-100 rounded-md border-none text-gray-900 placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-3 py-3 bg-gray-100 rounded-md border-none text-gray-900 placeholder-gray-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignIn}
            disabled={loading}
            className="w-full py-3 bg-teal-800 text-white font-semibold rounded-md"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Do not have an account?{" "}
          <a href="#" onClick={handleCreateAccount} className="text-teal-800 hover:underline">
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
}
