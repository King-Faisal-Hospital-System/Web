'use client';

import { UserIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function CreateAccount() {
  const router = useRouter();

  const handleNext = () => {
    router.push("signup/setup");
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

        <div className="flex justify-center items-center mb-8">
          <div className="flex items-center">
            <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-base mr-2">
              1
            </div>
            <span className="text-primary font-semibold mr-4">
              Personal Info
            </span>
            <div className="border-t border-gray-300 w-12 mx-2"></div>
            <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-base text-gray-500 mr-2">
              2
            </div>
            <span className="text-gray-500">Account Setup</span>
          </div>
        </div>

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
                placeholder="John@gmail.com"
                className="w-full pl-10 py-3 bg-input-field rounded-md border-none text-text placeholder-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Phone Number
            </label>
            <div className="relative">
              <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                placeholder="+250 788 123 4567"
                className="w-full pl-10 py-3 bg-input-field rounded-md border-none text-text placeholder-gray-500"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="w-full py-3 bg-primary text-white font-semibold rounded-md"
          >
            Next Step
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
