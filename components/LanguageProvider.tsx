"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { setLanguage, initializeLanguage } from "../store/slices/languageSlice";
import { fetchUserSettings } from "../store/slices/settingsSlice";
import { translateText, getBasicTranslation } from "../lib/translator";

interface LanguageContextType {
  currentLanguage: string;
  setCurrentLanguage: (language: string) => void;
  t: (key: string) => string;
  translateAsync: (text: string) => Promise<string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentLanguage } = useSelector((state: RootState) => state.language);
  const [translationCache, setTranslationCache] = useState<{[key: string]: string}>({});
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    
    dispatch(initializeLanguage());
    
    const timer = setTimeout(() => {
      dispatch(fetchUserSettings());
    }, 100);
    
    return () => clearTimeout(timer);
  }, [dispatch]);

  
  useEffect(() => {
    setTranslationCache({});
    setForceUpdate(prev => prev + 1);
  }, [currentLanguage]);

  const setCurrentLanguage = (language: string) => {
    dispatch(setLanguage(language));
    
    setTranslationCache({});
  };

 
  const t = (key: string): string => {
   
    if (currentLanguage === 'English') {
      return key;
    }

  
    const cacheKey = `${key}_${currentLanguage}`;
    if (translationCache[cacheKey]) {
      return translationCache[cacheKey];
    }

    
    const basicTranslation = getBasicTranslation(key, currentLanguage);
    if (basicTranslation) {
      
      setTimeout(() => {
        setTranslationCache(prev => ({
          ...prev,
          [cacheKey]: basicTranslation
        }));
      }, 0);
      return basicTranslation;
    }

   
    console.log(`Translating "${key}" to ${currentLanguage}`);
    translateText(key, currentLanguage).then(translatedText => {
      console.log(`Translation result: "${key}" -> "${translatedText}"`);
      setTranslationCache(prev => ({
        ...prev,
        [cacheKey]: translatedText
      }));
     
      setForceUpdate(prev => prev + 1);
    }).catch(error => {
      console.error(`Translation failed for "${key}":`, error);
    });

    return key; 
  };

  
  const translateAsync = async (text: string): Promise<string> => {
    if (currentLanguage === 'English') {
      return text;
    }

    const cacheKey = `${text}_${currentLanguage}`;
    if (translationCache[cacheKey]) {
      return translationCache[cacheKey];
    }

    try {
      const translatedText = await translateText(text, currentLanguage);
      setTranslationCache(prev => ({
        ...prev,
        [cacheKey]: translatedText
      }));
      return translatedText;
    } catch (error) {
      console.warn(`Translation failed for "${text}":`, error);
      return text;
    }
  };

  const value: LanguageContextType = {
    currentLanguage,
    setCurrentLanguage,
    t,
    translateAsync
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
