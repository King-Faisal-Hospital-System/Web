"use client";

import { Bell, Search } from "lucide-react";
import Image from "next/image";
import { useLanguageContext } from "./LanguageProvider";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { getCurrentUser } from "@/services/user.services";

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  const { t } = useLanguageContext();
  return (
    <header className={`flex justify-between items-center bg-white px-6 py-4 border-b border-gray-200 ${className}`}>
      <div className="relative w-72">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder={t('common.search') || "Search..."}
          className="pl-10 pr-4 py-2 w-full rounded-lg bg-[var(--input-field)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
          aria-label="Search"
        />
      </div>
      <div className="flex items-center space-x-4">
        <Bell size={22} className="cursor-pointer text-red-500" aria-label="Notifications" />
        <div className="flex items-center space-x-2">
          <Image
            src="/profile.jpg"
            alt="User profile"
            className="w-10 h-10 rounded-full"
            width={40}
            height={40}
          />
          <div>
            <p className="text-sm font-semibold">Test User</p>
            <p className="text-xs text-gray-500">Pharmacis</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
