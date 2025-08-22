
import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import GlobeIcon from './icons/GlobeIcon';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'tw', name: 'Twi' },
    { code: 'ha', name: 'Hausa' },
    { code: 'gp', name: 'Pidgin' },
];

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useTranslation();

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
    };

    return (
        <div className="relative">
            <GlobeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 dark:text-slate-400 pointer-events-none" />
            <select
                value={language}
                onChange={handleLanguageChange}
                className="pl-10 pr-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-transparent rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors cursor-pointer"
                aria-label="Select language"
            >
                {languages.map(lang => (
                    <option key={lang.code} value={lang.code} className="text-black dark:text-white bg-white dark:bg-slate-800">
                        {lang.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSwitcher;
