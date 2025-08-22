"use client";

import { UserIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setAccountField } from "../../store/slices/accountSlice";
import type { RootState } from "../../store/store";
import { useState } from "react";

export default function CreateAccount() {
  const router = useRouter();
  const dispatch = useDispatch();
  const account = useSelector((state: RootState) => state.account);
  const [error, setError] = useState("");

  const handleNext = () => {
    if (
      !account.firstName ||
      !account.lastName ||
      !account.username ||
      !account.email ||
      !account.phone
    ) {
      setError("All fields are required.");
      return;
    }

    setError("");
    console.log("Saved Account Data:", account);
    router.push("/signin");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 font-sans">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-text mb-2">
          Create Account
        </h1>
        <p className="text-center text-primary text-sm mb-8">
          KFH Inventory Management
        </p>

        <form className="space-y-4">
          
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-text mb-1">
                First Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={account.firstName}
                  onChange={(e) =>
                    dispatch(
                      setAccountField({
                        field: "firstName",
                        value: e.target.value,
                      })
                    )
                  }
                  placeholder="John"
                  className="w-full pl-10 py-3 bg-input-field rounded-md border-none text-text placeholder-gray-500"
                />
              </div>
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-text mb-1">
                Last Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={account.lastName}
                  onChange={(e) =>
                    dispatch(
                      setAccountField({
                        field: "lastName",
                        value: e.target.value,
                      })
                    )
                  }
                  placeholder="Doe"
                  className="w-full pl-10 py-3 bg-input-field rounded-md border-none text-text placeholder-gray-500"
                />
              </div>
            </div>
          </div>

        
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Username
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                required
                value={account.username}
                onChange={(e) =>
                  dispatch(
                    setAccountField({
                      field: "username",
                      value: e.target.value,
                    })
                  )
                }
                placeholder="John"
                className="w-full pl-10 py-3 bg-input-field rounded-md border-none text-text placeholder-gray-500"
              />
            </div>
          </div>

       
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Email Address
            </label>
            <div className="relative">
              <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                required
                value={account.email}
                onChange={(e) =>
                  dispatch(
                    setAccountField({ field: "email", value: e.target.value })
                  )
                }
                placeholder="John@gmail.com"
                className="w-full pl-10 py-3 bg-input-field rounded-md border-none text-text placeholder-gray-500"
              />
            </div>
          </div>

         
          <div>
            <label className="block text-sm font-medium text-text mb-1 ">
              Phone Number
            </label>
            <div className="relative">
              <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                required
                value={account.phone}
                onChange={(e) =>
                  dispatch(
                    setAccountField({ field: "phone", value: e.target.value })
                  )
                }
                placeholder="+250 788 123 4567"
                className="w-full pl-10 py-3 bg-input-field rounded-md border-none text-text placeholder-gray-500"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="button"
            onClick={handleNext}
            className="w-full py-3 bg-primary text-white font-semibold rounded-md"
          >
            Create Account
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-text">
          Already have an account?{" "}
          <a href="/signin" className="text-primary hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
