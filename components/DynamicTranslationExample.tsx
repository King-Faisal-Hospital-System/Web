"use client";

import React, { useState, useEffect } from 'react';
import { useLanguageContext } from './LanguageProvider';

export const DynamicTranslationExample: React.FC = () => {
  const { t, translateAsync, currentLanguage } = useLanguageContext();
  const [asyncTranslation, setAsyncTranslation] = useState<string>('');

  // Example of async translation for complex text
  useEffect(() => {
    const translateComplexText = async () => {
      const complexText = "Welcome to King Faisal Hospital Inventory Management System";
      const translated = await translateAsync(complexText);
      setAsyncTranslation(translated);
    };

    if (currentLanguage !== 'English') {
      translateComplexText();
    } else {
      setAsyncTranslation("Welcome to King Faisal Hospital Inventory Management System");
    }
  }, [currentLanguage, translateAsync]);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Dynamic Translation Demo</h2>
      
      {/* translations  */}
      <div className="space-y-2">
        <p><strong>Dashboard:</strong> {t('Dashboard')}</p>
        <p><strong>Inventory:</strong> {t('Inventory')}</p>
        <p><strong>Reports:</strong> {t('Reports')}</p>
        <p><strong>Settings:</strong> {t('Settings')} {currentLanguage === 'Kinyarwanda' && '(Umutwe)'}</p>
        <p><strong>Support:</strong> {t('Support')}</p>
        <p><strong>Medicine:</strong> {t('Medicine')}</p>
        <p><strong>Save Changes:</strong> {t('Save Changes')}</p>
      </div>

      {/* Async translation  */}
      <div className="mt-4 p-3 bg-gray-50 rounded">
        <p className="text-sm text-gray-600">Complex text (async translation):</p>
        <p className="font-medium">{asyncTranslation}</p>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Current Language: <span className="font-medium">{currentLanguage}</span>
      </div>
    </div>
  );
};
