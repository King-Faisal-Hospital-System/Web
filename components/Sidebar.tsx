"use client";

import {
  LayoutDashboard,
  Package,
  FileText,
  Users,
  Truck,
  CreditCard,
  Settings,
  Headphones,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguageContext } from "./LanguageProvider";

interface SidebarNavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  href,
  icon: Icon,
  label,
  active = false,
}) => (
  <li>
    <Link
      href={href}
      className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${
        active ? "bg-[var(--primary)] text-white" : "hover:bg-[var(--input-field)]"
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  </li>
);

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = "" }) => {
  const pathname = usePathname();
  const { t } = useLanguageContext();

  const navigationItems = [
    { href: "/admin/home", icon: LayoutDashboard, labelKey: "Dashboard" },
    { href: "/admin/inventory", icon: Package, labelKey: "Inventory" },
    { href: "/admin/reports", icon: FileText, labelKey: "Reports" },
    { href: "/admin/suppliers", icon: Truck, labelKey: "Suppliers" },
    { href: "/admin/invoices", icon: Users, labelKey: "Invoices" },
    { href: "/admin/payments", icon: CreditCard, labelKey: "Payments" },
    { href: "/admin/users", icon: Users, labelKey: "Users" },
  ];

  return (
    <aside className={`w-64 bg-white shadow-sm flex flex-col justify-between ${className}`}>
      <div>
        <div className="flex items-center justify-center h-20">
          <Image src="/logo.png" alt="Logo" width={80} height={80} />
        </div>
        <nav className="mt-6">
          <ul className="space-y-2 px-4">
            {navigationItems.map((item) => (
              <SidebarNavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={t(item.labelKey)}
                active={pathname === item.href}
              />
            ))}
          </ul>
        </nav>
      </div>
      <div className="px-4 pb-6 space-y-3">
        <Link
          href="/admin/settings"
          className={`flex items-center space-x-3 rounded-lg px-3 py-2 cursor-pointer ${
            pathname === "/admin/settings"
              ? "text-white bg-[var(--primary)]"
              : "hover:bg-[var(--input-field)]"
          }`}
        >
          <Settings size={20} className={pathname === "/admin/settings" ? "text-white" : ""} />
          <span>{t('Settings')}</span>
        </Link>
        <Link
          href="/admin/support"
          className="flex items-center space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2 cursor-pointer"
        >
          <Headphones size={20} />
          <span>{t('Support')}</span>
        </Link>
        <Link
          href="/signin"
          className="flex items-center space-x-3 hover:bg-red-100 text-red-600 rounded-lg px-3 py-2 cursor-pointer"
        >
          <LogOut size={20} />
          <span>{t('Logout')}</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
