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
  Search,
  
  
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../store/store";
import { fetchUserSettings, updateUserSettings, fetchBackupStatus, initiateBackup, updatePersonalInfo, updatePreferences, updateNotifications, updateBackupConfig } from "../../../store/slices/settingsSlice";
import { setLanguage, initializeLanguage } from "../../../store/slices/languageSlice";
import { useLanguageContext } from "../../../components/LanguageProvider";

const SidebarNavItem = ({
  href,
  icon: Icon,
  label,
  active = false,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
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

export default function SettingsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { personalInfo, preferences, notifications, backup, backupConfig, loading, error, saving, backupLoading } = useSelector((state: RootState) => state.settings);
  const { currentLanguage } = useSelector((state: RootState) => state.language);
  const { t } = useLanguageContext();

  const [activeTab, setActiveTab] = useState<"general" | "backup">("general");
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    dispatch(initializeLanguage());
    dispatch(fetchUserSettings());
    dispatch(fetchBackupStatus());
  }, [dispatch]);

  const handlePersonalInfoChange = (field: string, value: string) => {
    dispatch(updatePersonalInfo({ [field]: value }));
    setHasChanges(true);
  };

  const handlePreferencesChange = (field: string, value: string) => {
    dispatch(updatePreferences({ [field]: value }));
    if (field === 'language') {
      dispatch(setLanguage(value));
    }
    setHasChanges(true);
  };

  const handleNotificationsChange = (field: string, value: boolean) => {
    dispatch(updateNotifications({ [field]: value }));
    setHasChanges(true);
  };

  const handleBackupConfigChange = (field: string, value: string | number | boolean) => {
    dispatch(updateBackupConfig({ [field]: value }));
    setHasChanges(true);
  };

  const handleSaveChanges = async () => {
    try {
      await dispatch(updateUserSettings({ personalInfo, preferences, notifications, backupConfig }));
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  const handleInitiateBackup = async () => {
    try {
      await dispatch(initiateBackup());

      setTimeout(() => {
        dispatch(fetchBackupStatus());
      }, 2000);
    } catch (error) {
      console.error('Failed to initiate backup:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* sidebar */}
      <aside className="w-64 bg-white shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-start h-20">
            <Image src="/logo.png" alt="Logo" width={80} height={80} />
          </div>
          <nav className="mt-6">
            <ul className="space-y-2 px-4">
              <SidebarNavItem href="/stock_manager/home" icon={LayoutDashboard} label="Dashboard" />
              <SidebarNavItem href="/stock_manager/inventory" icon={Package} label="Inventory" />
              <SidebarNavItem href="/stock_manager/reports" icon={FileText} label="Reports" />
              
            </ul>
          </nav>
        </div>
        <div className="px-4 pb-6 space-y-3">
          <Link href="/admin/settings" className="flex items-center text-white  bg-[var(--primary)] space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2 cursor-pointer">
            <Settings size={20} className="text-white" />
            <span>Settings</span>
          </Link>
          <Link href="/admin/support" className="flex items-center space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2 cursor-pointer">
            <Headphones size={20} />
            <span>Support</span>
          </Link>
          <Link href="/admin/logout" className="flex items-center space-x-3 hover:bg-red-100 text-red-600 rounded-lg px-3 py-2 cursor-pointer">
            <LogOut size={20} />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      <div className="flex flex-col flex-1" style={{ background: "var(--background)" }}>
        {/* header */}
        <header className="flex justify-between items-center bg-white px-6 py-4 border-b border-gray-200">
          <div className="relative w-72">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full rounded-lg bg-[var(--input-field)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
              aria-label="Search settings"
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
                <p className="text-sm font-semibold">Dr. Dylan</p>
                <p className="text-xs text-gray-500">Pharmacist</p>
              </div>
            </div>
          </div>
        </header>

        {/*body */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold">{t('settings.title')}</h1>
                <p className="text-gray-500 mt-1">Configure Systems preferences, alerts and security</p>
              </div>
              <button
                onClick={handleSaveChanges}
                disabled={!hasChanges || saving}
                className={`px-6 py-2 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 shadow disabled:opacity-50`}
              >
                {saving ? t('common.loading') : t('settings.saveChanges')}
              </button>
            </div>

          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => setActiveTab("general")}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "general"
                    ? "bg-[var(--primary)] text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {t('settings.general')}
              </button>
              <button
                onClick={() => setActiveTab("backup")}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "backup"
                    ? "bg-[var(--primary)] text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {t('settings.backup')}
              </button>
            </div>
          </div>

          {activeTab === "general" ? (
            <div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-4">
                <h2 className="text-lg font-semibold mb-5">{t('settings.personalInfo')}</h2>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--primary)]"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">{t('settings.name')}</label>
                      <input
                        type="text"
                        value={personalInfo.name || 'Dr. Dylan'}
                        onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:ring-2 focus:ring-[var(--primary)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">{t('settings.email')}</label>
                      <input
                        type="email"
                        value={personalInfo.email || 'dr.dylan@kfh.rw'}
                        onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:ring-2 focus:ring-[var(--primary)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">{t('settings.phone')}</label>
                      <input
                        type="text"
                        value={personalInfo.phone || '+250 788 123 456'}
                        onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:ring-2 focus:ring-[var(--primary)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">{t('settings.role')}</label>
                      <input
                        type="text"
                        value={personalInfo.role || 'Pharmacist'}
                        className="mt-1 p-2 w-full border rounded-md bg-gray-200 focus:ring-2 focus:ring-[var(--primary)]"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">{t('settings.currency')}</label>
                      <select
                        value={preferences.currency}
                        onChange={(e) => handlePreferencesChange('currency', e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:ring-2 focus:ring-[var(--primary)]"
                      >
                        <option value="RWF">Rwandan Franc (RWF)</option>
                        <option value="USD">US Dollar (USD)</option>
                        <option value="EUR">Euro (EUR)</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-4">
                <h2 className="text-lg font-semibold mb-5">Regional Settings</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t('settings.language')}</label>
                    <select
                      value={preferences.language}
                      onChange={(e) => handlePreferencesChange('language', e.target.value)}
                      className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:ring-2 focus:ring-[var(--primary)]"
                    >
                      <option value="English">English</option>
                      <option value="Kinyarwanda">Kinyarwanda</option>
                      <option value="Spanish">Español</option>
                      <option value="French">Français</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t('settings.timezone')}</label>
                    <select
                      value={preferences.timezone}
                      onChange={(e) => handlePreferencesChange('timezone', e.target.value)}
                      className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:ring-2 focus:ring-[var(--primary)]"
                    >
                      <option value="Africa/Kigali">Africa/Kigali (CAT)</option>
                      <option value="Europe/Madrid">Europe/Madrid (CET)</option>
                      <option value="Europe/Paris">Europe/Paris (CET)</option>
                      <option value="America/New_York">America/New_York (EST)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t('settings.dateFormat')}</label>
                    <select
                      value={preferences.dateFormat}
                      onChange={(e) => handlePreferencesChange('dateFormat', e.target.value)}
                      className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:ring-2 focus:ring-[var(--primary)]"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">{t('settings.backupConfig')}</h2>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={backupConfig.autoBackup}
                      onChange={(e) => handleBackupConfigChange('autoBackup', e.target.checked)}
                      className="w-12 h-6 bg-gray-200 rounded-full relative appearance-none cursor-pointer"
                      style={{
                        background: backupConfig.autoBackup ? 'var(--primary)' : '#e5e7eb'
                      }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
                    <select
                      value={backupConfig.frequency}
                      onChange={(e) => handleBackupConfigChange('frequency', e.target.value)}
                      className="w-full p-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-[var(--primary)]"
                    >
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Retention (Days)</label>
                    <input
                      type="number"
                      value={backupConfig.retentionDays}
                      onChange={(e) => handleBackupConfigChange('retentionDays', parseInt(e.target.value))}
                      className="w-full p-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-[var(--primary)]"
                      min="1"
                      max="365"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Backup Location</label>
                    <select
                      value={backupConfig.location}
                      onChange={(e) => handleBackupConfigChange('location', e.target.value)}
                      className="w-full p-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-[var(--primary)]"
                    >
                      <option value="Cloud Storage">Cloud Storage</option>
                      <option value="Local Storage">Local Storage</option>
                      <option value="External Drive">External Drive</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleInitiateBackup}
                    disabled={!hasChanges || saving}
                    className="px-6 py-2 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 shadow disabled:opacity-50"
                  >
                    {saving ? t('common.loading') : t('settings.saveChanges')}
                  </button>
                  
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Restore
                  </button>
                </div>
              </div>
              
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-4">
                <h2 className="text-lg font-semibold mb-6">{t('settings.systemStatus')}</h2>
                
                {backupLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--primary)]"></div>
                  </div>
                ) : backup?.systemStatus ? (
                  <div className="space-y-4">
                   
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="font-medium text-gray-900">Last Backup</p>
                          <p className="text-sm text-gray-600">
                            {new Date(backup.systemStatus.lastBackup.date).toLocaleDateString()} • {backup.systemStatus.lastBackup.time}
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                        {backup.systemStatus.lastBackup.status}
                      </span>
                    </div>
                    
                   
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div>
                          <p className="font-medium text-gray-900">Database Size</p>
                          <p className="text-sm text-gray-600">{backup.systemStatus.databaseSize}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                        Normal
                      </span>
                    </div>
                    
                    
                    <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <div>
                          <p className="font-medium text-gray-900">Storage Usage</p>
                          <p className="text-sm text-gray-600">
                            {backup.systemStatus.storageUsage.used}% of {backup.systemStatus.storageUsage.total}GB used
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                        backup.systemStatus.storageUsage.status === 'Warning' 
                          ? 'bg-orange-100 text-orange-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {backup.systemStatus.storageUsage.status}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No system status available</p>
                )}
              </div>
            </div>
          )}
          </div>
        </main>
      </div>
    </div>
  );
}