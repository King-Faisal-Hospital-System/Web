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
  Bell,
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Clock,
  Search,
  DollarSign
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import type { RootState, AppDispatch } from "../../../store/store";
import { fetchDashboardStats } from "../../../store/slices/dashboardSlice";
import { useLanguageContext } from "../../../components/LanguageProvider";
import { Sidebar } from "../../../components/Sidebar";
import Header from "@/components/Header";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { totalProducts, lowStockItems, expiringSoon, activities, topProducts, loading, error } = useSelector((state: RootState) => state.dashboard);
  const { t } = useLanguageContext();

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  return (
    <div className="flex h-screen">
      <Sidebar />

      
      <div className="flex flex-col flex-1">
        {/* header */}
        <Header/>

        {/* body */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">{t('Dashboard')}</h1>
              <p className="text-gray-500">{t('Inventory Management overview')}</p>
            </div>
            <Link href="/admin/reports" className="px-5 py-2 bg-[var(--primary)] text-white rounded-lg shadow hover:opacity-90 inline-block">
              {t('Generate Report')}
            </Link>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
              <div>
                <h2 className="text-gray-500 font-medium">{t('Total Products')}</h2>
                <p className="text-3xl font-bold text-gray-800">{loading ? '...' : totalProducts}</p>
                <p className="text-gray-400 text-sm">~ {t('Active stock items')}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
              <div>
                <h2 className="text-gray-500 font-medium">{t('Low Stock')}</h2>
                <p className="text-3xl font-bold text-red-600">{loading ? '...' : lowStockItems}</p>
                <p className="text-gray-400 text-sm">~ {t('Below reorder point')}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
              <div>
                <h2 className="text-gray-500 font-medium">{t('Expiring Soon')}</h2>
                <p className="text-3xl font-bold text-orange-600">{loading ? '...' : expiringSoon}</p>
                <p className="text-gray-400 text-sm">~ {t('Within 60 days')}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>

          
          <div className="grid grid-cols-3 gap-6 mt-6">
            <div className="col-span-2 bg-white shadow rounded-lg p-5 border">
              <h2 className="flex items-center font-semibold text-lg mb-4">
                <Activity className="mr-2" size={20} /> {t('Recent Activities')}
              </h2>
              <ul className="space-y-4">
                {loading ? (
                  <li className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--primary)]"></div>
                  </li>
                ) : error ? (
                  <li className="text-center py-8 text-red-500">{t('Error')}: {error}</li>
                ) : activities.length === 0 ? (
                  <li className="text-center py-8 text-gray-500">{t('No recent activities')}</li>
                ) : (
                  activities.map((activity) => (
                    <li
                      key={activity.id}
                      className="flex justify-between items-center bg-[var(--input-field)] rounded-lg p-4"
                    >
                      <div className="flex items-center space-x-3">
                        {activity.type === "in" && (
                          <span className="bg-green-100 text-green-600 p-2 rounded-full">
                            <TrendingUp size={20} />
                          </span>
                        )}
                        {activity.type === "out" && (
                          <span className="bg-orange-100 text-orange-600 p-2 rounded-full">
                            <TrendingDown size={20} />
                          </span>
                        )}
                        {activity.type === "low" && (
                          <span className="bg-yellow-100 text-yellow-600 p-2 rounded-full">
                            <AlertTriangle size={20} />
                          </span>
                        )}
                        <div>
                          <p className="font-semibold">{activity.title}</p>
                          <p className="text-sm text-gray-500">{activity.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">{activity.code}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>

            
            <div className="bg-white shadow rounded-lg p-5 border">
              <h2 className="flex items-center font-semibold text-lg mb-4">
                <Package className="mr-2" size={20} /> {t('Top Products')}
              </h2>
              <ul className="space-y-4">
                {loading ? (
                  <li className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--primary)]"></div>
                  </li>
                ) : error ? (
                  <li className="text-center py-8 text-red-500">{t('Error loading products')}</li>
                ) : topProducts.length === 0 ? (
                  <li className="text-center py-8 text-gray-500">{t('No products found')}</li>
                ) : (
                  topProducts.map((product, i) => {
                    const utilizationRate = product.quantity > 0 ? (product.issued / product.quantity) * 100 : 0;
                    return (
                      <li key={i} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <p className="font-medium">{product.name}</p>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                            {product.balance}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <p>{t('Issued')}: {product.issued}</p>
                          <p>{product.value.toLocaleString()} RWF</p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[var(--primary)] h-2 rounded-full"
                            style={{ width: `${Math.min(utilizationRate, 100)}%` }}
                          ></div>
                        </div>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
