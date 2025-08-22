
import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import GlobeIcon from './icons/GlobeIcon';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'tw', name: 'Twi' },
    { code: 'ha', name: 'Hausa' },
];

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useTranslation();

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
    };

    return (
        <div className="relative">
            <GlobeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
            <select
                value={language}
                onChange={handleLanguageChange}
                className="pl-10 pr-4 py-2 text-sm font-medium text-slate-300 bg-white/10 hover:bg-white/20 border border-transparent rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-white transition-colors cursor-pointer"
                aria-label="Select language"
            >
                {languages.map(lang => (
                    <option key={lang.code} value={lang.code} className="text-black">
                        {lang.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSwitcher;
