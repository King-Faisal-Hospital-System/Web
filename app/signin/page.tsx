'use client';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState as useReactState } from 'react';

type AccountType = 'admin' | 'stockManager' | 'supplier';

export default function SignIn() {
  const router = useRouter();
  const [accountType, setAccountType] = useReactState<AccountType>('stockManager');
  const [showPassword, setShowPassword] = useReactState(false);

  const handleAccountTypeClick = (type: AccountType) => {
    setAccountType(type);
  };

  const handleSignIn = () => {
    alert('Signed in as ' + accountType + '!');
  };

  const handleCreateAccount = () => {
    router.push('/signup');
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
            onClick={() => handleAccountTypeClick('admin')}
            className={`px-4 py-2 rounded-md ${
              accountType === 'admin' ? 'bg-teal-800 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Admin
          </button>
          <button
            onClick={() => handleAccountTypeClick('stockManager')}
            className={`px-4 py-2 rounded-md ${
              accountType === 'stockManager' ? 'bg-teal-800 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Stock Manager
          </button>
          <button
            onClick={() => handleAccountTypeClick('supplier')}
            className={`px-4 py-2 rounded-md ${
              accountType === 'supplier' ? 'bg-teal-800 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Supplier
          </button>
        </div>

      
        <form className="space-y-4 text-left">
          
          {accountType === 'supplier' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="Your Company Ltd"
                  className="w-full pl-3 py-3 bg-gray-100 rounded-md border-none text-gray-900 placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Phone Number
                </label>
                <input
                  type="text"
                  placeholder="+250 788 123 4567"
                  className="w-full pl-3 py-3 bg-gray-100 rounded-md border-none text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>
          )}

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="john@gmail.com"
              className="w-full pl-3 py-3 bg-gray-100 rounded-md border-none text-gray-900 placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="w-full pl-3 py-3 bg-gray-100 rounded-md border-none text-gray-900 placeholder-gray-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignIn}
            className="w-full py-3 bg-teal-800 text-white font-semibold rounded-md"
          >
            Sign In
          </button>
        </form>

       
        <p className="text-center mt-6 text-sm text-gray-600">
          Do not have an account?{' '}
          <a href="#" onClick={handleCreateAccount} className="text-teal-800 hover:underline">
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
}
