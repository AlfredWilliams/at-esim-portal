import React, { createContext, useState, useContext, ReactNode } from 'react';
import { translations } from '../translations';

type LanguageContextType = {
    language: string;
    setLanguage: (language: string) => void;
    t: (key: string, replacements?: { [key: string]: string }) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState('en'); // Default language

    const t = (key: string, replacements?: { [key: string]: string }): string => {
        let translation = translations[language]?.[key] || translations['en']?.[key] || key;
        
        if (replacements) {
            Object.keys(replacements).forEach(placeholder => {
                translation = translation.replace(`{{${placeholder}}}`, replacements[placeholder]);
            });
        }
        
        return translation;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useTranslation = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useTranslation must be used within a LanguageProvider');
    }
    return context;
};
