'use client';

import { CheckIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState as useReactState } from 'react';

export default function AccountSetup() {
  const router = useRouter();
  const [accountType, setAccountType] = useReactState('stockManager'); 
  const [showPassword, setShowPassword] = useReactState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useReactState(false); 

  const handleBack = () => {
    router.push('/signup');
  };

  const handleSubmit = () => {
    alert('Account created!');
  };

  const handleAccountTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAccountType(e.target.value);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 font-sans">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-text mb-2">Create Account</h1>
        <p className="text-center text-primary text-sm mb-8">KFH Inventory Management</p>

        <div className="flex justify-center items-center mb-8">
          <div className="flex items-center">
            <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-base mr-2">
              <CheckIcon className="h-5 w-5 text-white" />
            </div>
            <span className="text-primary font-semibold mr-4">Personal Info</span>
            <div className="border-t border-gray-300 w-12 mx-2"></div>
            <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-base text-white mr-2">2</div>
            <span className="text-primary font-semibold">Account Setup</span>
          </div>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1">Account Types</label>
            <div className="relative">
              <select
                className="w-full py-3 bg-input-field rounded-md border-none text-text appearance-none pl-10 pr-10"
                value={accountType}
                onChange={handleAccountTypeChange}
              >
                <option value="stockManager" className="bg-primary text-white pl-3 py-2">
                  <span className="flex items-center">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Stock Manager
                  </span>
                </option>
                <option value="supplier" className="pl-3 py-2">
                  <span className="flex items-center">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Supplier
                  </span>
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {accountType === 'stockManager' && (
            <>
              <div>
                <label className="block text-sm font-medium text-text mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a secure Password"
                    className="w-full pl-3 py-3 bg-input-field rounded-md border-none text-text placeholder-gray-500 pr-10"
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

              <div>
                <label className="block text-sm font-medium text-text mb-1">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    className="w-full pl-3 py-3 bg-input-field rounded-md border-none text-text placeholder-gray-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                  >
                    {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </>
          )}

          {accountType === 'supplier' && (
            <>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-text mb-1">Company Name</label>
                  <input
                    type="text"
                    placeholder="Your Company Ltd"
                    className="w-full pl-3 py-3 bg-input-field rounded-md border-none text-text placeholder-gray-500"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-text mb-1">Company Phone Number</label>
                  <input
                    type="text"
                    placeholder="+250 788 123 4567"
                    className="w-full pl-3 py-3 bg-input-field rounded-md border-none text-text placeholder-gray-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a secure Password"
                    className="w-full pl-3 py-3 bg-input-field rounded-md border-none text-text placeholder-gray-500 pr-10"
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

              <div>
                <label className="block text-sm font-medium text-text mb-1">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    className="w-full pl-3 py-3 bg-input-field rounded-md border-none text-text placeholder-gray-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                  >
                    {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-between space-x-4">
            <button
              type="button"
              onClick={handleBack}
              className="w-1/2 py-3 bg-white text-primary font-semibold rounded-md border border-primary"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-1/2 py-3 bg-primary text-white font-semibold rounded-md"
            >
              Create Account
            </button>
          </div>
        </form>

        <p className="text-center mt-6 text-sm text-text">
          Already have an account? <a href="/signin" className="text-primary hover:underline">Sign In</a>
        </p>
      </div>
    </div>
  );
}