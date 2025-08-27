"use client";

import {
  Download,
  Trash2,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock
} from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../store/store";
import { fetchUserSettings, updateUserSettings, fetchBackupStatus, initiateBackup, updatePersonalInfo, updatePreferences, updateNotifications, updateBackupConfig, fetchBackupHistory, deleteBackupFile } from "../../../store/slices/settingsSlice";
import { setLanguage, initializeLanguage, fetchUserLanguage } from "../../../store/slices/languageSlice";
import { useLanguageContext } from "../../../components/LanguageProvider";
import { Sidebar } from "../../../components/Sidebar";
import { Header } from "../../../components/Header";


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
    dispatch(fetchBackupHistory());
  }, [dispatch]);

  const handlePersonalInfoChange = (field: string, value: string) => {
    dispatch(updatePersonalInfo({ [field]: value }));
    setHasChanges(true);
  };

  const handlePreferencesChange = (field: string, value: string) => {
    dispatch(updatePreferences({ [field]: value }));
    if (field === 'language') {
      // Update language immediately in Redux store
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
      // After saving settings, fetch the updated language from backend to ensure sync
      if (preferences.language) {
        dispatch(fetchUserLanguage());
      }
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  const handleInitiateBackup = async () => {
    try {
      await dispatch(initiateBackup());
      // Refresh backup status and history after initiating
      setTimeout(() => {
        dispatch(fetchBackupStatus());
        dispatch(fetchBackupHistory());
      }, 2000);
    } catch (error) {
      console.error('Failed to initiate backup:', error);
    }
  };

  const handleDownloadBackup = (fileName: string) => {
    const downloadUrl = `http://localhost:5000/api/settings/backup/download/${fileName}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName;
    link.click();
  };

  const handleDeleteBackup = async (fileName: string) => {
    if (window.confirm(`Are you sure you want to delete backup: ${fileName}?`)) {
      try {
        await dispatch(deleteBackupFile(fileName));
        dispatch(fetchBackupHistory());
        dispatch(fetchBackupStatus());
      } catch (error) {
        console.error('Failed to delete backup:', error);
      }
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
      <Sidebar />
      <div className="flex flex-col flex-1" style={{ background: "var(--background)" }}>
        <Header />

        {/*body */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold">{t('Settings')}</h1>
                <p className="text-gray-500 mt-1">{t('Configure system preferences, alerts and security')}</p>
              </div>
              <button
                onClick={handleSaveChanges}
                disabled={!hasChanges || saving}
                className={`px-6 py-2 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 shadow disabled:opacity-50`}
              >
                {saving ? t('Loading') : t('Save Changes')}
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
                  {t('General')}
                </button>
                <button
                  onClick={() => setActiveTab("backup")}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === "backup"
                      ? "bg-[var(--primary)] text-white shadow"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {t('Backup')}
                </button>
              </div>
            </div>

            {activeTab === "general" ? (
              <div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-4">
                  <h2 className="text-lg font-semibold mb-5">{t('Personal Information')}</h2>
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--primary)]"></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">{t('Name')}</label>
                        <input
                          type="text"
                          value={personalInfo.name || 'Dr. Dylan'}
                          onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                          className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:ring-2 focus:ring-[var(--primary)]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">{t('Email')}</label>
                        <input
                          type="email"
                          value={personalInfo.email || 'dr.dylan@kfh.rw'}
                          onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                          className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:ring-2 focus:ring-[var(--primary)]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">{t('Phone')}</label>
                        <input
                          type="text"
                          value={personalInfo.phone || '+250 788 123 456'}
                          onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                          className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:ring-2 focus:ring-[var(--primary)]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">{t('Role')}</label>
                        <input
                          type="text"
                          value={personalInfo.role || 'Pharmacist'}
                          className="mt-1 p-2 w-full border rounded-md bg-gray-200 focus:ring-2 focus:ring-[var(--primary)]"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">{t('Currency')}</label>
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
                <h2 className="text-lg font-semibold mb-5">{t('Regional Settings')}</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t('Language')}</label>
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
                    <label className="block text-sm font-medium text-gray-700">{t('Timezone')}</label>
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
                    <label className="block text-sm font-medium text-gray-700">{t('Date Format')}</label>
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
              {/* Backup Configuration */}
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
                    disabled={backupLoading}
                    className="px-6 py-2 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 shadow disabled:opacity-50 flex items-center gap-2"
                  >
                    {backupLoading ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        {t('Creating Backup')}
                      </>
                    ) : (
                      <>
                        <Download size={16} />
                        {t('Create Backup Now')}
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={handleSaveChanges}
                    disabled={!hasChanges || saving}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                  >
                    {saving ? t('Loading') : t('Save Changes')}
                  </button>
                </div>
              </div>
              
              {/* System Status */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-4">
                <h2 className="text-lg font-semibold mb-6">{t('System Status')}</h2>
                
                {backupLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--primary)]"></div>
                  </div>
                ) : backup?.systemStatus ? (
                  <div className="space-y-4">
                    {/* Last Backup */}
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="font-medium text-gray-900">{t('Last Backup')}</p>
                          <p className="text-sm text-gray-600">
                            {backup.systemStatus.lastBackup.date !== 'Never' ? (
                              `${new Date(backup.systemStatus.lastBackup.date).toLocaleDateString()} • ${backup.systemStatus.lastBackup.time}`
                            ) : (
                              t('No backups found')
                            )}
                          </p>
                          {backup.systemStatus.lastBackup.size && (
                            <p className="text-xs text-gray-500">Size: {backup.systemStatus.lastBackup.size}</p>
                          )}
                        </div>
                      </div>
                      <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                        backup.systemStatus.lastBackup.status === 'Success' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {backup.systemStatus.lastBackup.status}
                      </span>
                    </div>
                    
                    {/* Database Size */}
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div>
                          <p className="font-medium text-gray-900">Database Size</p>
                          <p className="text-sm text-gray-600">{backup.systemStatus.databaseSize}</p>
                          {backup.systemStatus.collections && (
                            <p className="text-xs text-gray-500">
                              {backup.systemStatus.collections} collections • {backup.systemStatus.documents} documents
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                        Normal
                      </span>
                    </div>
                    
                    {/* Storage Usage */}
                    <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <div>
                          <p className="font-medium text-gray-900">Storage Usage</p>
                          <p className="text-sm text-gray-600">
                            {backup.systemStatus.storageUsage.used}% of {backup.systemStatus.storageUsage.total}GB used
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-orange-500 h-2 rounded-full" 
                              style={{ width: `${backup.systemStatus.storageUsage.used}%` }}
                            ></div>
                          </div>
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
                    
                    {/* Backup History */}
                    {backup.backupHistory && backup.backupHistory.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-md font-semibold mb-4">Recent Backups</h3>
                        <div className="space-y-2">
                          {backup.backupHistory.map((backupItem: any, index: number) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <div>
                                  <p className="text-sm font-medium">{backupItem.fileName}</p>
                                  <p className="text-xs text-gray-500">
                                    {new Date(backupItem.createdAt).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-500">{backupItem.size}</span>
                                <button 
                                  onClick={() => handleDownloadBackup(backupItem.fileName)}
                                  className="p-1 text-blue-500 hover:bg-blue-100 rounded"
                                  title="Download backup"
                                >
                                  <Download size={14} />
                                </button>
                                <button 
                                  onClick={() => handleDeleteBackup(backupItem.fileName)}
                                  className="p-1 text-red-500 hover:bg-red-100 rounded"
                                  title="Delete backup"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No system status available</p>
                    <button 
                      onClick={() => dispatch(fetchBackupStatus())}
                      className="mt-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      Refresh Status
                    </button>
                  </div>
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